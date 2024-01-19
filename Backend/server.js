require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app=express();
const alertRoutes=require("./routes/alert");
const twilio = require('twilio');

// middlware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method); //this is middleware
    next();
  });

  const twilioClient = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

//   routes
app.use("/api/alert", alertRoutes);

app.post('/api/sendSMS', (req, res) => {
  const { to, message } = req.body;

  twilioClient.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })
    .then(message => res.json({ success: true, message: message.sid }))
    .catch(error => res.json({ success: false, error: error.message }));
});


  //connect to db
mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log("connnected to db & listening to port" , process.env.PORT);
    })
})
.catch((err)=>{
    console.log(err);
})