const Udg = require('../models/Udg');

exports.obtenerMaterias = async (req,res) =>{
   try {
      const {nrc} = req.query;
      let materia = await Udg.findOne({nrc:nrc});
      res.json({materia}); 
   } catch (error) {
      console.log(error);
      res.status(500).send('Error en Udg Controller, metodo Obtener');  
   }
}