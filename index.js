
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const nodemailer = require("nodemailer");
app.use(express.json());

app.listen(port, () => console.log(`API ON ==> http://localhost:${port}/`))
app.post('/send', main)

async function main(req, res) {
    const {body} = req

    const from = body?.from
    const subject = body?.subject
    const text = body?.text
    const to  = body?.to

    if(!from) {
        return res.status(400).send("Está faltando o campo 'from'")
    }
    if(!subject) {
        return res.status(400).send("Está faltando o campo 'subject'")
    }
    if(!text) {
        return res.status(400).send("Está faltando o campo 'text'")
    }
    if(!to) {
        return res.status(400).send("Está faltando o campo 'to'")
    }

  let transporter = nodemailer.createTransport({ 
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { 
       user: process.env.USER_AUTH, 
       pass: process.env.PASSWORD_AUTH 
     } 
    });

  let info = await transporter.sendMail({
    from,
    to,
    subject, 
    text, 
  });


  res.json({info})
}
