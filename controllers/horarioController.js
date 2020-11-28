const Horario = require('../models/Horario');

exports.crearHorario = async (req,res) =>{
   
   try {
      //Crear nuevo horario
      const horario = new Horario(req.body);
      horario.save();
      res.json(horario);
      
   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}