const mongoose = require("mongoose");

const appSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
},{
    versionKey:false
});

const AppModel=mongoose.model("app",appSchema)

module.exports={AppModel}