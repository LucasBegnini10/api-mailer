
const express = require('express')
const app = express()
const port = 3000
const nodemailer = require("nodemailer");


app.post('/send', main)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


async function main(req, res) {
    const {query} = req

    const from = query?.from
    const subject = query?.subject
    const text = query?.text

    if(!from) {
        return res.status(400).send("Está faltando o campo 'from'")
    }
    if(!subject) {
        return res.status(400).send("Está faltando o campo 'subject'")
    }
    if(!text) {
        return res.status(400).send("Está faltando o campo 'text'")
    }

  let transporter = nodemailer.createTransport({ 
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { 
       user: 'begninilucas12@gmail.com', 
       pass: 'shpftezcfppahcmd' 
     } 
    });

  let info = await transporter.sendMail({
    from: from, 
    to: "begninilucas12@gmail.com", 
    subject: subject, 
    text: text, 
  });


  res.status(200).json({info})
}
