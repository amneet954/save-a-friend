require("dotenv").config();
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendMail = (email, username, subject, petName, reportURL) => {
  let lostPetTemplate = `<p>Hello ${username},</p><br/><p>Please follow the link <a href=${reportURL}>here</a> to visit the rescue page  for  ${petName}  and  to  get updates regarding  the community search for ${petName}.</p><br/><p>Thank you,</p><br/><p>The Save-A-Friend Team</p>`;

  let newUserTemplate = `<p>Hello ${username},</p><br/><p>On behalf of the "Save-A-Friend" community. I want to personally welcome you to our community! I truly believe that if every member in our community can work together, we can help find each others lost pets/best friends. If you ever have any questions or concerns, please feel free to reply back to this email!</p><br/><p>Thank you,</p><br/><p>Amneet Sandhu</p><p>Founder of Save-A-Friend</p>`;

  let petCommentTemplate = `<p>Hello ${username},</p><br/><p>Please follow the link <a href=${reportURL}>here</a> to see updates regarding  the search for ${petName}. We hope this is the update that saves your pet!</p><br/><p>Warm Wishes,</p><br/><p>The Save-A-Friend Team</p>`;

  let mailObj = {
    from: "petSaver@noreply.gmail.com",
    to: email,
    subject: subject.subject,
    html:
      subject.type === "New User"
        ? newUserTemplate
        : "Lost Pet Comment"
        ? petCommentTemplate
        : lostPetTemplate,
  };

  transporter.sendMail(mailObj, (error, info) => {
    if (error) console.log("Error: ", error);
    else console.log("Email sent: " + info.response);
  });
};

const time = () => {
  const value = Date.now();
  var date = new Date(value);
  let final = date.toLocaleString("en-US", { timeZone: "America/New_York" });
  return final;
};

module.exports = {
  sendMail,
  time,
};
