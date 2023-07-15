const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: {type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
});

const userModel = mongoose.model("user", UserSchema);


module.exports= {userModel}