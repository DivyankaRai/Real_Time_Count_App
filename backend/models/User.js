const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "player"], default: "player" },
  clickCount: { type: Number, default: 0 },
  blocked: { type: Boolean, default: false }, 
});

module.exports = mongoose.model("Addusers", UserSchema);
