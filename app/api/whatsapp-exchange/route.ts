import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { accessToken } = await req.json();

  if (!accessToken) {
    return NextResponse.json({ ok: false, error: 'Missing accessToken' }, { status: 400 });
  }

  // Debug: check token scopes
  const debugRes = await fetch(
    `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${process.env.FB_APP_ID}|${process.env.FB_APP_SECRET}`
  );
  const debugData = await debugRes.json();
  console.log('Token scopes:', JSON.stringify(debugData?.data?.scopes));

  // Try whatsapp_business_management endpoint
  const wabaRes = await fetch(
    `https://graph.facebook.com/v20.0/me?fields=whatsapp_business_accounts{id,phone_numbers{id,display_phone_number}}&access_token=${accessToken}`
  );
  const wabaData = await wabaRes.json();

  console.log('=== WhatsApp Setup ===');
  console.log('WABA response:', JSON.stringify(wabaData, null, 2));

  let waba_id: string | null = null;
  let phone_number_id: string | null = null;

  const businesses = wabaData.data ?? [];
  for (const biz of businesses) {
    const accounts = biz.whatsapp_business_accounts?.data ?? [];
    for (const account of accounts) {
      waba_id = account.id;
      const phones = account.phone_numbers?.data ?? [];
      if (phones.length > 0) phone_number_id = phones[0].id;
      break;
    }
    if (waba_id) break;
  }

  console.log('WABA ID:', waba_id);
  console.log('Phone Number ID:', phone_number_id);
  console.log('=====================');

  const { error: dbError } = await supabase
    .from('whatsapp_config')
    .upsert({ id: 1, waba_id, phone_number_id, created_at: new Date().toISOString() });

  if (dbError) {
    console.error('Failed to save to DB:', dbError.message);
  } else {
    console.log('Saved to whatsapp_config table in Supabase.');
  }

  return NextResponse.json({ ok: true, waba_id, phone_number_id });
}
