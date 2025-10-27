import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    // create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // mail options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Hello ${name}`,
      text: `Hi ${name}, you are invited to join the team at Synkora!`,
    };

    // send mail
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
