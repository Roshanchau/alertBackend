const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const alertSchema = new Schema(
  {
  alert:{
    type:String,
    required:true,
  },
},
{timestamps:true}
);

module.exports=mongoose.model("Alert" , alertSchema);