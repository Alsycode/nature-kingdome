import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { code, waba_id, phone_number_id } = await req.json();

  const tokenRes = await fetch(
    `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${process.env.FB_APP_ID}&client_secret=${process.env.FB_APP_SECRET}&code=${code}`
  );
  const tokenData = await tokenRes.json();

  console.log('=== WhatsApp Embedded Signup Complete ===');
  console.log('Token response:', JSON.stringify(tokenData, null, 2));
  console.log('WABA ID:', waba_id);
  console.log('Phone Number ID:', phone_number_id);
  console.log('=========================================');
  console.log('Next step: create a permanent System User token in Meta Business Settings.');

  if (tokenData.error) {
    return NextResponse.json({ ok: false, error: tokenData.error }, { status: 400 });
  }

  const { error: dbError } = await supabase
    .from('whatsapp_config')
    .upsert({ id: 1, waba_id, phone_number_id, created_at: new Date().toISOString() });

  if (dbError) {
    console.error('Failed to save to DB:', dbError.message);
  } else {
    console.log('Saved to whatsapp_config table in Supabase.');
  }

  return NextResponse.json({ ok: true });
}
