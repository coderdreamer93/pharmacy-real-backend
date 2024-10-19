const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "role is required"],
    enum: ["user", "admin"],
  },
  name: {
    type: String,
    required: function () {
      if (this.role === "user" || this.role === "admin") {
        return true;
      }
      return false;
    },
  },

 

  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },  

}, { timestamps: true});

module.exports = mongoose.model('users', userSchema)