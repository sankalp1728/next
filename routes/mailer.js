const nodemailer = require('nodemailer')
const express = require('express')


//here the user is an object that contains the user:mail, user:password, recievers Array, Subject, Text, HTML
const mailer = (user, recievers, subject, text, html) =>{

    const recieverString = recievers[0];
    for(i = 0 ; i<recievers.length ; i++){
        recieverString += ', ' + recievers[i];
    }

    var transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 587,
        auth: {
          user: "user.name",
          pass: "user.password"
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
            res.send(err)
        }else{
            console.log('email sent')
            res.status(200).send("email sent")
        }
    })
}


module.exports = mailer