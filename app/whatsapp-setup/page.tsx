'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export default function WhatsAppSetup() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v20.0',
      });
    };

    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      const fjs = d.getElementsByTagName(s)[0];
      fjs.parentNode!.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    const listener = (event: MessageEvent) => {
      console.log('Message received from origin:', event.origin, event.data);
      if (!event.origin.includes('facebook.com')) return;
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'WA_EMBEDDED_SIGNUP') {
          sessionStorage.setItem('waba_id', data.data.waba_id);
          sessionStorage.setItem('phone_number_id', data.data.phone_number_id);
        }
      } catch (e) {}
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  function launchWhatsAppSignup() {
    window.FB.login(
      function (response: any) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          fetch('/api/whatsapp-exchange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken }),
          }).then((res) => res.json()).then((data) => {
            if (data.ok) {
              alert(`Connected! WABA ID: ${data.waba_id} | Phone Number ID: ${data.phone_number_id}`);
            } else {
              alert('Connection failed. Check server logs.');
            }
          });
        } else {
          alert('Setup cancelled or not authorized.');
        }
      },
      {
        config_id: '999527586301334',
        extras: {
          setup: {},
          sessionInfoVersion: '3',
          featureType: 'whatsapp_business_app_onboarding',
        },
      }
    );
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>WhatsApp Business Setup</h1>
      <p>Click the button below and scan the QR code with the resort phone to connect the WhatsApp number.</p>
      <button
        onClick={launchWhatsAppSignup}
        style={{
          marginTop: 20,
          padding: '12px 24px',
          backgroundColor: '#25D366',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        Connect WhatsApp
      </button>
    </div>
  );
}
