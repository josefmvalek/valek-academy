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

    const lowerSeg = (data.segment || '').toLowerCase();
    const isAdult = lowerSeg.includes('dospěl') || lowerSeg.includes('konverzace');
    const isTeen = lowerSeg.includes('středoškoláci') || lowerSeg.includes('maturita') || lowerSeg.includes('střední');
    const isScio = lowerSeg.includes('scio') || lowerSeg.includes('přijímačk');

    // Dynamic greeting & context tailored to who signed up
    let introGreeting = 'Dobrý den, děkuji za vaši rezervaci ukázkové lekce hrou v Uherském Hradišti.';
    let prepInstructions = 'Pouze <strong>přezůvky a dobrou náladu</strong>. Veškeré deskové hry, výukové karty, mini-tabule i nápoje (čaj, voda) jsou v doučovně zdarma k dispozici.';
    let prepTitle = '🎒 Co si vzít na 1. lekci s sebou?';
    let nameLabel = 'Jméno rodiče:';
    let secondaryLabel = 'Dítě / student:';

    if (isAdult) {
      introGreeting = 'Dobrý den, děkuji za váš zájem o lekce angličtiny a konverzace pro dospělé v Uherském Hradišti.';
      prepTitle = '☕ Co s sebou na lekci?';
      prepInstructions = 'Pouze <strong>dobrou náladu a chuť mluvit bez stresu a ostychu</strong>. Káva, čaj, voda i veškeré výukové materiály a konverzační okruhy jsou v učebně zdarma k dispozici.';
      nameLabel = 'Jméno zájemce:';
      secondaryLabel = '';
    } else if (isTeen) {
      introGreeting = 'Dobrý den, děkuji za rezervaci lekce pro studenta střední školy / přípravy k maturitě v Uherském Hradišti.';
      prepTitle = '📚 Co si vzít na lekci s sebou?';
      prepInstructions = 'Pouze <strong>sešit či blok, psací potřeby a chuť se posunout</strong>. Čaj, voda a studijní materiály jsou k dispozici zdarma.';
      nameLabel = 'Jméno studenta:';
      secondaryLabel = 'Kontakt na rodiče:';
    } else if (isScio) {
      introGreeting = 'Dobrý den, děkuji za poptávku přípravných kurzů SCIO a přijímacích zkoušek v Uherském Hradišti.';
      prepTitle = '📐 Co si vzít na lekci s sebou?';
      prepInstructions = 'Základní <strong>psací a rýsovací potřeby</strong>. Veškeré testové sady SCIO a CERMAT pro vás máme v učebně připravené.';
      nameLabel = 'Jméno rodiče / zájemce:';
      secondaryLabel = 'Žák / student:';
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
            ${introGreeting}
          </p>
        </div>

        <div style="background-color: #FFFFFF; border: 1px solid #E8DCBF; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 800; margin: 0 0 16px 0; color: #2A190F; border-bottom: 2px solid #FEF3C7; padding-bottom: 8px;">
            📋 Shrnutí rezervace:
          </h3>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            ${data.segment ? `
            <tr>
              <td style="padding: 6px 0; color: #78716C; width: 40%;">Program:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #2A190F;">${data.segment}</td>
            </tr>
            ` : ''}
            ${data.selectedGroup ? `
            <tr>
              <td style="padding: 6px 0; color: #78716C;">Vybraná skupinka:</td>
              <td style="padding: 6px 0; font-weight: 800; color: #B45309;">${data.selectedGroup}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 6px 0; color: #78716C; width: 40%;">${nameLabel}</td>
              <td style="padding: 6px 0; font-weight: 700; color: #2A190F;">${data.name}</td>
            </tr>
            ${(!isAdult && data.childName && secondaryLabel) ? `
            <tr>
              <td style="padding: 6px 0; color: #78716C;">${secondaryLabel}</td>
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
            ${data.days ? `
            <tr>
              <td style="padding: 6px 0; color: #78716C;">Preferované dny:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #2A190F;">${data.days}</td>
            </tr>
            ` : ''}
            ${data.level ? `
            <tr>
              <td style="padding: 6px 0; color: #78716C;">Úroveň / ročník:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #2A190F;">${data.level}</td>
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
            ${prepTitle}
          </h4>
          <p style="margin: 0; font-size: 13px; color: #5C473A; line-height: 1.5;">
            ${prepInstructions}
          </p>
        </div>

        <div style="font-size: 13px; color: #78716C; text-align: center; border-top: 1px solid #E8DCBF; padding-top: 20px;">
          <p style="margin: 0 0 6px 0;">
            Do 24 hodin se vám ozvu s potvrzením konkrétního termínu a detailů.
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
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'VALEK ACADEMY <info@valekacademy.cz>';
    const adminEmail = process.env.RESEND_TO_ADMIN || 'info@valekacademy.cz';

    if (resendApiKey) {
      try {
        const clientSubject = data.selectedGroup 
          ? `Potvrzení rezervace: ${data.selectedGroup} – VALEK ACADEMY`
          : `Potvrzení rezervace 1. lekce zdarma – VALEK ACADEMY`;

        const adminSubject = data.selectedGroup
          ? `Nová rezervace (${data.selectedGroup}) – ${data.name}`
          : `Nová poptávka: ${data.segment || 'Web'} – ${data.name}`;

        const [clientRes, adminRes] = await Promise.all([
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: fromEmail,
              to: [data.email],
              reply_to: 'info@valekacademy.cz',
              subject: clientSubject,
              html: clientHtml,
            })
          }),
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: fromEmail,
              to: [adminEmail],
              reply_to: data.email,
              subject: adminSubject,
              html: `
                <div style="font-family: sans-serif; max-width: 600px;">
                  <h2 style="color: #2A190F;">Nová rezervace z webu VALEK ACADEMY</h2>
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">Program:</td><td style="padding: 6px; border-bottom: 1px solid #eee;">${data.segment || 'Neuvedeno'}</td></tr>
                    ${data.selectedGroup ? `<tr><td style="padding: 6px; font-weight: bold; color: #B45309; border-bottom: 1px solid #eee;">Vybraná skupinka:</td><td style="padding: 6px; font-weight: bold; color: #B45309; border-bottom: 1px solid #eee;">${data.selectedGroup}</td></tr>` : ''}
                    <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">${nameLabel}</td><td style="padding: 6px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
                    ${(!isAdult && data.childName && secondaryLabel) ? `<tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">${secondaryLabel}:</td><td style="padding: 6px; border-bottom: 1px solid #eee;">${data.childName}</td></tr>` : ''}
                    <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">Telefon:</td><td style="padding: 6px; border-bottom: 1px solid #eee;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
                    <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">E-mail:</td><td style="padding: 6px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
                    <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">Preferované dny:</td><td style="padding: 6px; border-bottom: 1px solid #eee;">${data.days || 'Kdykoliv'}</td></tr>
                    ${data.level ? `<tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">Úroveň / ročník:</td><td style="padding: 6px; border-bottom: 1px solid #eee;">${data.level}</td></tr>` : ''}
                    <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">Poznámka:</td><td style="padding: 6px; border-bottom: 1px solid #eee;">${data.message || 'Bez poznámky'}</td></tr>
                  </table>
                </div>
              `
            })
          })
        ]);

        if (!clientRes.ok) {
          const errData = await clientRes.text();
          console.warn('Resend client email response not OK:', clientRes.status, errData);
        }
        if (!adminRes.ok) {
          const errData = await adminRes.text();
          console.warn('Resend admin email response not OK:', adminRes.status, errData);
        }
      } catch (emailErr) {
        console.error('Failed to send email via Resend:', emailErr);
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Rezervace byla úspěšně přijata.' 
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
