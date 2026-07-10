import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";
const SITE_URL = "https://www.anandthakkar.com";

const welcomeEmailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Anand Thakkar</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;">

      <tr>
        <td style="padding:28px 32px 24px;border-bottom:1px solid #f0f0f0;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td width="70" valign="middle">
                <img src="${SITE_URL}/headshot.jpg" alt="Anand Thakkar" width="56" height="56"
                  style="border-radius:50%;object-fit:cover;border:2px solid #f4f4f4;display:block;" />
              </td>
              <td valign="middle" style="padding-left:14px;">
                <p style="margin:0;font-size:16px;font-weight:700;color:#0a0a0a;line-height:1.2;">Anand Thakkar</p>
                <p style="margin:5px 0 0;font-size:13px;color:#9e9e9e;">anandthakkar.com</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:32px 32px 0;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c2185b;">Welcome</p>
          <h1 style="margin:0 0 20px;font-size:26px;font-weight:800;color:#0a0a0a;line-height:1.25;letter-spacing:-0.02em;">Glad you&rsquo;re here.</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:#444;">Hi,</p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:#444;">
            Thank you for subscribing. I am Anand Thakkar. I spent eight years inside India&rsquo;s financial system, then taught myself to write code, and now I build at the intersection of both.
          </p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:#444;">
            I write about finance, technology, and what happens when the two collide. From someone who has lived on both sides of that line.
          </p>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.75;color:#444;">
            No schedule, no filler. You&rsquo;ll hear from me the next time I have something worth your time.
          </p>
          <div style="border-left:3px solid #c2185b;padding:14px 20px;background:#fdf4f7;border-radius:0 10px 10px 0;margin-bottom:32px;">
            <p style="margin:0;font-size:14px;line-height:1.7;color:#555;font-style:italic;">
              &ldquo;Finance is the original information system. Software didn&rsquo;t replace it. It inherited it.&rdquo;
            </p>
          </div>
          <div style="margin-bottom:36px;">
            <a href="${SITE_URL}" style="display:inline-block;background:#c2185b;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:10px;font-size:14px;font-weight:700;">
              Visit the site
            </a>
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding:0 32px;">
          <div style="border-top:1px solid #f0f0f0;"></div>
        </td>
      </tr>

      <tr>
        <td style="padding:20px 32px 28px;">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td valign="middle">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="middle">
                      <img src="${SITE_URL}/favicon.ico" alt="" width="20" height="20"
                        style="border-radius:4px;display:block;" />
                    </td>
                    <td valign="middle" style="padding-left:8px;">
                      <span style="font-size:13px;font-weight:600;color:#9e9e9e;">anandthakkar.com</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding-top:10px;">
                <p style="margin:0;font-size:12px;color:#c4c4c4;line-height:1.6;">
                  You&rsquo;re receiving this because you subscribed at anandthakkar.com.
                  <a href="${SITE_URL}" style="color:#c4c4c4;text-decoration:underline;">Unsubscribe</a> any time.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }

  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    if (AUDIENCE_ID) {
      // The SDK returns errors instead of throwing; surface them in the logs,
      // otherwise a wrong audience id silently loses every subscriber.
      const { error: contactError } = await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
      });
      if (contactError) {
        console.error("resend.contacts.create failed:", contactError);
      }
    } else {
      console.error("RESEND_AUDIENCE_ID is not set; subscriber not saved.");
    }

    await resend.emails.send({
      from: "Anand Thakkar <hello@anandthakkar.com>",
      replyTo: "anand.thakkar@outlook.com",
      to: email,
      subject: "Welcome to anandthakkar.com",
      html: welcomeEmailHtml,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
