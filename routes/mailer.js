const nodemailer = require('nodemailer')
const express = require('express')


//here the user is an object that contains the user:mail, user:password, recievers Array, Subject, Text, HTML
const mailer = (recievers, subject, text, html) =>{

    var recieverString = ""
    for(i = 0 ; i<recievers.length ; i++){
        recieverString += recievers[i].email + ', ';
    }

    var transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 587,
        secure : false,
        auth: {
          user: "Sankalp@geekatweb.com",
          pass: "Sankalp#1728"
        }
      });

    let mailOption = {
        from: user.mail,
        to: recieverString,
        subject : subject,
        text : text,
        html : html
    };

    transporter.sendMail(mailOption,function(err,data){                     //mobile notification also required
        if(err){
            console.log(err)
        }else{
            console.log('email sent')
        }
    })
}


module.exports = mailer