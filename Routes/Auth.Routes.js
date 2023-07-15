const { Router } = require("express");
const { AuthModal } = require("../Modals/Auth.Modal");
const jwt = require("jsonwebtoken");
const AuthRouter = Router();
const bcrypt = require("bcrypt");

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user =  await AuthModal.findOne({email});
 // console.log(user)
  const hashed_password = user.password;
//  console.log(password)
//  console.log(hashed_password)
  try {
    bcrypt.compare(password, hashed_password, function (err, result) {
      
        if (result) {
        const token = jwt.sign({ email }, process.env.SECRET_KEY);
        res.send({ msg: "Login Succefully", token });
      }
      else{
        res.send({msg: "please login again "})
      }
    });
  } catch (err) {
    console.log(err);
    res.send({ msg: "something went wrong" });
  }
});

AuthRouter.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      const user = new AuthModal({
        username,
        email,
        password: hash,
      });
      await user.save();
      res.send({ msg: "signup  successfully" });
    });
  } catch (err) {
    console.log(err);
    res.send({ msg: "something went wrong" });
  }
});

module.exports = { AuthRouter };
