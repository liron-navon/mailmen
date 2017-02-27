const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const transporter = require('./transporter.js');


const app = express();
const port = process.env.PORT || 3000;
const sender = transporter.sender;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//const sendTo = "lironavon42@gmail.com";
//const subject = "My website contact ✔";

app.get('/', function (req, res) {
    res.send('ready for your mail');
});

app.post('/mailto/:targetMail', function (req, res) {

    var target = req.params.targetMail;
    var callback = req.body.callback;
    var subject = req.body.subject;
    var name = req.body.name;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var message = req.body.message || "no message";

    var mailText = writeMail(name, mail, phone, message);
    var mailHtml = writeMailHtml(name, mail, phone, message);

    // setup email data with unicode symbols
    let mailOptions = {
        from: `"${name}" <${transporter.address}>`, // sender address
        to: target, // list of receivers
        subject: `${subject}`, // Subject line
        text: mailText, // plain text body
        html: mailHtml // html body
    };

    // send mail with defined transport object
    sender.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.json(JSON.stringify(error));
            return console.log(error);
        }

        if(callback){
          res.redirect(callback);
        }

        res.json({ response: info.response, id: info.messageId });
        console.log(`Message ${info.messageId} sent: ${info.response}`);
    });




});

function writeMail(name, mail, phone, message) {

    var msg = `name : ${name} \n`;
    msg += `mail : ${mail}  \n`;
    msg += `phone : ${phone} \n`;
    msg += message;

    return msg;
}

function writeMailHtml(name, mail, phone, message) {

    var msg = `<b>${name}</b> <br/>
     <b>mail</b> : ${mail}  <br/>
     <b>phone</b> : ${phone} <br/>
     <p>${message}</p>`;

    return msg;
}


app.listen(port, function () {
    console.log(`listenning to port : ${port}`);
});
