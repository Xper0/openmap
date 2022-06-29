import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userListSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String
  },

})


const Users = mongoose.model("userList", userListSchema);


export default  Users;