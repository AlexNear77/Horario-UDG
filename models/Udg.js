const mongoose = require('mongoose');

const UdgSchema = mongoose.Schema({
   nombre:{
      type: String,
      required: false
   },
   cupos:{
      type: Boolean,
      default: false
   },
   maestro:{
      type: String,
      required: false
   },
   dias:{
      type: String,
      required: false
   },
   nrc:{
      type: String,
      required: true,
      trim: true
   },
   creado:{
      type: Date,
      default: Date.now()
   }
});

module.exports = mongoose.model('Udg',UdgSchema);