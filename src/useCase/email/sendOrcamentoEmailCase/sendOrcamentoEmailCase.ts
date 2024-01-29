import nodemailer from 'nodemailer';

export interface ISendOrcamentoEmailParams {
  email: string;
  nome: string;
  orcamentoId: string | undefined;
}

class SendOrcamentoEmailCase {
  async execute({ email, nome, orcamentoId }: ISendOrcamentoEmailParams) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'igorlabakig@gmail.com', // Seu endereço de e-mail
        pass: process.env.EMAIL_PASSWORD, // Sua senha de e-mail
      },
    });

    const mailOptions = {
      from: 'igorlabakig@gmail.com',
      to: email,
      subject: 'Proposta AR756',
      html: `
            <div style="font-family: Arial, sans-serif; height: 990px;">
                <table style="width: 100%; height: 100%; background-image: url('https://res.cloudinary.com/dcjkvwbvh/image/upload/v1684606263/onbridge/qqwsl8w6yheuxhh69fzl.jpg'); background-size: cover;">
                    <tr>
                        <td>
                        <table style="background-color: white; margin: auto; padding: 20px; width: 50%; height: 690px; border-radius: 10px;">
                            <tr>
                            <td style="text-align: center;">
                                <img style="width: 300px; height: 290px; margin: 0 auto;" src="https://res.cloudinary.com/dcjkvwbvh/image/upload/v1688637347/onbridge/uswu0yqtfeo2aq3vomkf.png" alt="logo AR756" />
                                <h1 style="color: #333; width: 100%; text-align: center; margin-top: 10px;">Olá ${nome}, recebemos a sua mensagem!</h1>
                                <p style="font-size: 14px; width: 60%; margin: 10px auto; text-align: center;">Agradecemos o seu interesse em conhecer a AR756. Simulamos um orçamento para seu evento, por gentileza clique no botão abaixo para ver a proposta.</p>
                                <div style="width: 100%; text-align: center;margin-top: 40px;">
                                <a href="https://ar756.vercel.app/orcamento/byId/${orcamentoId}" style="text-decoration: none;">
                                    <button style="background-color: black; color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px; display: inline-block;">Orçamento</button>
                                </a>
                                </div>
                                <h2 style="font-size: 14px; width: 60%; margin: 10px auto; text-align: center; margin-top: 40px;">SIGA-NOS</h2>
                                <div style="text-align: center;">
                                <a href="https://www.tiktok.com/@ar756_" style="text-decoration: none; margin-right: 10px;"><img src="https://res.cloudinary.com/dcjkvwbvh/image/upload/v1684619444/onbridge/acavjdbzordarbrebmel.png" alt="Logo Instagram" /></a>
                                <a href="https://www.instagram.com/ar756_/" style="text-decoration: none; margin-right: 10px;"><img src="https://res.cloudinary.com/dcjkvwbvh/image/upload/v1684618470/onbridge/dtl5hydbqev8msdjthpi.png" alt="Logo Instagram" /></a>
                                <a href="https://www.facebook.com/profile.php?id=100085832906065" style="text-decoration: none;"><img src="https://res.cloudinary.com/dcjkvwbvh/image/upload/v1684619160/onbridge/vtrjovla8axhudksaedi.png" alt="Logo Instagram" /></a>
                                </div>
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                </table>
            </div>
            `,
      /*   attachments: base64Files.map((item:any) => {
                return {
                filename: item.fileName,
                content: item.base64String,
                encoding: 'base64'
                }
            })  */
    };

    // Envia o e-mail
    await transporter.sendMail(mailOptions);
  }
}

export { SendOrcamentoEmailCase };
