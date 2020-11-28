const Horario = require('../models/Horario');
const { validationResult} = require('express-validator');

exports.crearHorario = async (req,res) =>{

   //revisando si hay errores
   const errores = validationResult(req);
   if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()})
   }

   try {
      //Crear nuevo horario
      const horario = new Horario(req.body);
      //Guardar el creador via jsonwebToken
      horario.creador = req.usuario.id;
      //Guardamos horario
      horario.save();
      res.json(horario);

   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}