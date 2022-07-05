import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const Schema = mongoose.Schema;

const userListSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  profile:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employees",
    autopopulate: true,
  },
  role: {
    type: String
  },

})

userListSchema.plugin(mongooseAutoPopulate);
const Users = mongoose.model("userList", userListSchema);


export default  Users;