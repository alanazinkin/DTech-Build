/*Alana's Edits*/
/*Clicking Remind Button*/
import React from 'react';
import { google } from 'googleapis';

const ReminderButton = () => {
 const handleReminderClick = async () => {
   try {
     // Load the API credentials from a secure location
     const credentials = {
       client_id: 'YOUR_CLIENT_ID',
       client_secret: 'YOUR_CLIENT_SECRET',
       redirect_uris: ['YOUR_REDIRECT_URI'],
       // Add any other required properties
     };


     // Create an OAuth2 client with the credentials
     const oAuth2Client = new google.auth.OAuth2(
       credentials.client_id,
       credentials.client_secret,
       credentials.redirect_uris[0]
     );


     // Set the desired Google Calendar and Gmail scopes
     const SCOPES = [
       'https://www.googleapis.com/auth/calendar',
       'https://www.googleapis.com/auth/gmail.send',
     ];


     // Generate an authentication URL
     const authUrl = oAuth2Client.generateAuthUrl({
       access_type: 'offline',
       scope: SCOPES,
     });


     // Redirect the user to the authentication URL and complete the authentication process
     // This step needs to be handled outside the React component


     // Once authentication is completed and you have the access token, set it in the OAuth2 client
     const accessToken = 'YOUR_ACCESS_TOKEN';
     oAuth2Client.setCredentials({ access_token: accessToken });


     // Define the group members' email addresses
     const groupMembers = ['member1@gmail.com', 'member2@gmail.com', 'member3@gmail.com'];


     // Compose the email message
     const emailSubject = 'Reminder: Fill out availability';
     const emailBody = 'Please fill out your availability on the shared Google Calendar.';


     // Send an email reminder to each group member
     for (const memberEmail of groupMembers) {
       const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });


       const email = [
         'From: "Your Name" <your-email@gmail.com>',
         `To: ${memberEmail}`,
         `Subject: ${emailSubject}`,
         '',
         emailBody,
       ].join('\r\n').trim();


       await gmail.users.messages.send({
         userId: 'me',
         requestBody: {
           raw: Buffer.from(email).toString('base64'),
         },
       });


       console.log(`Email sent to ${memberEmail}`);
     }
   } catch (error) {
     console.error('Error sending email:', error);
   }
 };


 return (
   <button onClick={handleReminderClick}>
     Send Reminder
   </button>
 );
};

export default ReminderButton;
