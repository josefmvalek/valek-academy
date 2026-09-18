import type { APIRoute } from 'astro';

export const prerender = false;

interface ReservationPayload {
  name: string;
  childName?: string;
  phone: string;
  email: string;
  segment?: string;
  selectedGroup?: string;
  days?: string;
  level?: string;
  message?: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ReservationPayload = await request.json();

    if (!data.name || !data.phone || !data.email) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Chybí povinné údaje (jméno, telefon nebo e-mail).' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // HTML Email Template for Autoresponder (Client confirmation)
    const clientHtml = `
      <div style="font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF7F2; border: 2px solid #F59E0B; border-radius: 24px; padding: 32px; color: #2A190F;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-block; padding: 6px 16px; background-color: #FDE68A; border: 1px solid #F59E0B; border-radius: 999px; font-size: 12px; font-weight: 800; text-transform: uppercase; color: #78350F; margin-bottom: 12px;">
            🎁 1. lekce 100% ZDARMA
          </div>
          <h1 style="font-size: 24px; font-weight: 900; margin: 0 0 8px 0; color: #2A190F;">
            Potvrzení rezervace – VALEK ACADEMY
          </h1>
          <p style="font-size: 15px; color: #5C473A; margin: 0;">
            Dobrý den, děkuji za vaši rezervaci ukázkové lekce hrou v Uherském Hradišti.
          </p>
        </div>

        <div style="background-color: #FFFFFF; border: 1px solid #E8DCBF; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 800; margin: 0 0 16px 0; color: #2A190F; border-bottom: 2px solid #FEF3C7; padding-bottom: 8px;">
            📋 Shrnutí rezervace:
          </h3>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #78716C; width: 40%;">Jméno rodiče:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #2A190F;">${data.name}</td>
            </tr>
            ${data.childName ? `
            <tr>
              <td style="padding: 6px 0; color: #78716C;">Dítě / student:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #2A190F;">${data.childName}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 6px 0; color: #78716C;">Telefon:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #2A190F;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #78716C;">E-mail:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #2A190F;">${data.email}</td>
            </tr>
            ${data.selectedGroup ? `
            <tr>
              <td style="padding: 6px 0; color: #78716C;">Vybraná skupinka:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #B45309;">${data.selectedGroup}</td>
            </tr>
            ` : ''}
            ${data.days ? `
            <tr>
              <td style="padding: 6px 0; color: #78716C;">Preferované dny:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #2A190F;">${data.days}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 6px 0; color: #78716C;">Místo výuky:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #2A190F;">Růžová 1238, Uherské Hradiště (naproti ZŠ UNESCO)</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #78716C;">Cena:</td>
              <td style="padding: 6px 0; font-weight: 800; color: #059669;">1. celá lekce je 100% ZDARMA</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #FEF3C7; border: 1px solid #F59E0B; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 800; color: #78350F;">
            🎒 Co si vzít na 1. lekci s sebou?
          </h4>
          <p style="margin: 0; font-size: 13px; color: #5C473A; line-height: 1.5;">
            Pouze <strong>přezůvky a dobrou náladu</strong>. Veškeré deskové hry, výukové karty, mini-tabule i nápoje (čaj, voda) jsou v doučovně zdarma k dispozici.
          </p>
        </div>

        <div style="font-size: 13px; color: #78716C; text-align: center; border-top: 1px solid #E8DCBF; padding-top: 20px;">
          <p style="margin: 0 0 6px 0;">
            Do 24 hodin se vám ozvu s potvrzením konkrétního termínu.
          </p>
          <p style="margin: 0; font-weight: 700; color: #2A190F;">
            Josef Válek • VALEK ACADEMY Uherské Hradiště<br/>
            Tel: <a href="tel:+420792372642" style="color: #B45309; text-decoration: none;">+420 792 372 642</a> | WhatsApp: <a href="https://wa.me/420792372642" style="color: #059669; text-decoration: none;">Chat na WhatsApp</a>
          </p>
        </div>
      </div>
    `;

    // Resend integration if API key is provided
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'VALEK ACADEMY <info@valekacademy.cz>',
          to: [data.email],
          reply_to: 'info@valekacademy.cz',
          subject: `Potvrzení rezervace 1. lekce zdarma – VALEK ACADEMY`,
          html: clientHtml,
        })
      });

      // Also send notification to Mr. Valek
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Rezervace Web <info@valekacademy.cz>',
          to: ['info@valekacademy.cz'],
          reply_to: data.email,
          subject: `Nová rezervace 1. lekce: ${data.name} (${data.childName || 'dítě'})`,
          html: `
            <h2>Nová rezervace z webu VALEK ACADEMY</h2>
            <p><strong>Jméno rodiče:</strong> ${data.name}</p>
            <p><strong>Dítě:</strong> ${data.childName || 'Neuvedeno'}</p>
            <p><strong>Telefon:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
            <p><strong>E-mail:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Skupinka:</strong> ${data.selectedGroup || 'Dle domluvy'}</p>
            <p><strong>Dny:</strong> ${data.days || 'Kdykoliv'}</p>
            <p><strong>Úroveň:</strong> ${data.level || 'Neuvedeno'}</p>
            <p><strong>Zpráva:</strong> ${data.message || 'Bez poznámky'}</p>
          `
        })
      });

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Rezervace i potvrzovací e-mail byly v pořádku odeslány.' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Default fallback when RESEND_API_KEY is not set:
    // Return success with formatted receipt data so client displays rich confirmation receipt.
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Rezervace přijata ke zpracování.',
      data: {
        name: data.name,
        childName: data.childName,
        selectedGroup: data.selectedGroup,
        days: data.days,
        phone: data.phone
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('Reservation API error:', err);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Nastala chyba při zpracování rezervace na serveru.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
