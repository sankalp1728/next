const express = require("express")
const router = express.Router()
var CronJob = require('cron').CronJob;


var mrfApprovalJob = new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');


mrfApprovalJob.start()

module.exports

