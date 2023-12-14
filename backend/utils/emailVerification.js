export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hakymazeez@gmail.com",
      pass: "vzse xzjh unmd zayx",
    },
  });

  const mailOptions = {
    from: "linkedin@gmail.com",
    to: email,
    subject: "Verification email",
    text: `Welcome to linkedin-clone! \nClick on the following link to verify your email :https//localhost:3000/verify/${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("verification email sent");
  } catch (error) {
    console.error("There was an error sending verification email");
  }
};
