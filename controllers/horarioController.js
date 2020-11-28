const Horario = require('../models/Horario');

exports.crearHorario = async (req,res) =>{
   
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