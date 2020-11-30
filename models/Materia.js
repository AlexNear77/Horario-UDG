const mongoose = require('mongoose');

const MateriaSchema = mongoose.Schema({
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
   horario:{
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
   },
   horario:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Horario'
   }
});

module.exports = mongoose.model('Materia',MateriaSchema);