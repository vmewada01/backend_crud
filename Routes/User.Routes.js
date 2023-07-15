const { Router } = require("express");
const { userModel } = require("../Modals/UserModal");
const { Authenctication } = require("../Middlewares/Auth.middleware");

const userRouter = Router();

userRouter.get("/read", Authenctication, async (req, res) => {
  const { email } = req.body;
  //   console.log(email)
  const user = await userModel.findOne({ email });
  console.log(user);
  try {
    if (user) {
      res.send({ user });
    } else {
      res.send({ msg: "create post first" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "something went wrong" });
  }
});

userRouter.post("/create", Authenctication, async (req, res) => {
  try {
    const user = new userModel({ ...req.body });
    await user.save();
    res.send({ msg: "created successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "something went wrong" });
  }
});

userRouter.delete("/:id", Authenctication, async (req, res) => {
  const { id } = req.params;
  //   console.log(email)
  // console.log(id)
  const user = await userModel.findOne({ _id: id });
  //console.log(user);
  try {
    if (user) {
      await userModel.deleteOne({ _id: id });

      res.send({ msg: "deleted succefully" });
    } else {
      res.send({ msg: "create post first" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "something went wrong" });
  }
});


userRouter.patch("/:id", Authenctication, async (req, res) => {
    const { id } = req.params;
    const updated_object = req.body;
    //   console.log(email)
   // console.log(id)
    const user = await userModel.findByIdAndUpdate({_id: id} , {$set: updated_object});
    //console.log(user);
    try {
      if (user) {
       //  await  userModel.update({_id: id} , {$set: updated_object});
  
        res.send({ msg: "updated succefully" });
      } else {
        res.send({ msg: "create post first" });
      }
    } catch (err) {
      console.log(err);
      res.send({ msg: "something went wrong" });
    }
  });
















module.exports = { userRouter };
