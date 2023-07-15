const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
   email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  
});

const AuthModal = mongoose.model("auth", AuthSchema);


module.exports= {AuthModal}