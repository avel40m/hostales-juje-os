import { transporter } from "../utils/email.js";

export const sendEmail = async (req,res) => {
    const {email,name,subject,message} = req.body;
    try {
    const resaponse = await transporter.sendMail({
      from: `${email}`, // sender address
      to: '"Hostal Web" <hostal@example.com>', // list of receivers
      subject: `Mensaje enviado de: ${name}`, // Subject line
      text: `${subject}`, // plain text body
      html: `<b>${message}</b>`, // html body
    });
    if(!resaponse)
        return res.status(404).json({message:'Hubo un error al enviar'});
    return res.status(200).json({message:'Se envió el email'});
    } catch (error) {
        return res.status(500).json({message:'Error al enviar'});
    }
}