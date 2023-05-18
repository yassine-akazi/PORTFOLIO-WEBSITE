const dotenv = require("dotenv");
dotenv.config()
const express = require("express");
const Mailgen = require("mailgen");
const  transporter  = require("./nodemailer");
const path = require("path")
const fs = require("fs")
const cors = require("cors");

// * App config 
const app = express();
const PORT = process.env.PORT

// * Middleware
app.use(express.json());
app.use(cors())



app.post("/", async (req, res) => {
  const body = req.body;

  // * Generate an HTML email with the provided contents
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Yassine Akazi",
      link: process.env.CLIENT_URL || "",
      
    },
  });

  const html = mailGenerator.generate({
    
    body: {
      name: body.name +   " -  Email : " + body.email,
      intro: body.message,

    }
     
  });

  try {
    // * Send confirmation email
    await transporter.sendMail({
      from: body.email,
      to: process.env.SMTP_USER ,
      subject: "Email from PortFolio ", // Subject line
      
      html, // html body
    });

    res.status(200).json({ message: "Message Sent" });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

})

if (process.env.NODE_ENV) {
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "./", "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send('Please run "npm run build" to build the frontend');
  });
}
app.listen(PORT, () => console.log("App running on PORT", PORT))