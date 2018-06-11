const express = require ('express');
const nodemailer = require('nodemailer');


const fs = require('fs');

const https = require('https');

// var smtpTransport = require('nodemailer-smtp-transport');


const app = express();

const httpOptions = {

  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')

};



app.get('/', (req,res)=> {

  res.send('test')
});


app.post('/email' , (req,res)=> {


  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
              user: 'rohit.m.bhambhani@gmail.com', //  user
              pass: 'Hmmmmm' //  password
          }
      });
      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Ghost Mail 👻" <BooOoo@example.com>', // sender address
          to: 'bhambhani.ba@gmail.com', //  receiver
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>' // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }


          console.send('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          res.send(" Message Sent! ")
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
  });



})




const server = https.createServer(httpOptions, app).listen(3000, ()=>{
  console.log('listening on port 3000')
})
