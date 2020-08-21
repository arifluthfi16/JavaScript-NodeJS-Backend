const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const fetch = require("node-fetch");

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

const verifyEmail = (req,server_res) => {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);

    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), (auth)=>{
      let finalRes = false;

    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list({
        userId: 'me',
        q: 'noreply@marketkoin.com'
    }, async (err, res) => {

        if (err) return console.log('The API returned an error: ' + err);

        const data = res.data;
        let messageId
        try{
          messageId = data.messages[0].id
        }catch(er){
          response.status(400).send({
            success : 0,
            error_msg : "Failed to find email"
          });
          return;
        }

        var request = gmail.users.messages.get({
            'userId': 'me',
            'id': messageId
        }, async (err,res)=>{
            let messageParts = res.data.payload.parts[0].body
            let data = Base64.decode(messageParts.data);
            let splited = data.split("\n");

            let splites;
            let finalUrl;
            splites =splited[3].split("https://");
            finalUrl = `https://${splites[2]}`
            if(splites.length === 1){
              splites =splited[3].split("http://");
              finalUrl = `http://${splites[2]}`
            }
            finalUrl = finalUrl.replace(/(\r\n|\n|\r)/gm, "");  

            // console.log(finalUrl);
            
            // Fetch to the email verification url
            let response = await fetch(finalUrl);
            
            // console.log(response);

            if((response.url)){
              // Success
              server_res
              .status(200)
              .send({
                success : 1,
                data : {
                  verification_url : finalUrl,
                  message_id : messageId
                }
              });
            }else{
              // Failed
              server_res
              .status(400)
              .send({
                success : 0,
                error_msg : "Failed to verify user"
              });
            }
        });
    });
    });
  });
}

const isUserReceivedEmail = (req,response) => {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.

    authorize(JSON.parse(content), (auth)=>{
      const gmail = google.gmail({version: 'v1', auth});
      return gmail.users.messages.list({
        userId: 'me',
        q: 'from:noreply@marketkoin.com, subject:Marketkoin - Email Verification',
        
      }, async (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);

        const data = res.data;  

        let messageId
        try{
          messageId = data.messages[0].id
        }catch(er){
          response.status(400).send({
            success : 0,
            error_msg : "Failed to find email"
          });
          return;
        }

        if(messageId !== ""){
          response.status(200).send({
            success : 1,
            data : {
              "id" : messageId
            }
          });
        }else {
          response.status(400).send({
            success : 0,
            error_msg : "User did not receive the email"
          });
        }
      });
    });
  });
}


function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

function isResponseURLValid(url){
  switch(url){
    case "https://marketkoin.com/login" : return true;
    case "http://marketkoin.com/login" : return true;
    case "https://localhost:5000/login" : return true;
    case "https://localhost:6000/login" : return true;
    case "https://localhost:3002/login" : return true;
    default : return false
  }
}

module.exports = {
  isUserReceivedEmail,
  verifyEmail
}
