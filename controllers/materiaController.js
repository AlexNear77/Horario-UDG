const Materia = require('../models/Materia');
const Horario = require('../models/Horario');
const {validationResult} = require('express-validator');

//-------------------------------------
//       Crea una nueva materia
//====================================
exports.crearMateria = async (req,res) =>{

   //revisando si hay errores
   const errores = validationResult(req);
   if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()})
   }

   try {
      //Extraer el horario y comprobar si existe
      const {horario} = req.body;
      const existehorario = await Horario.findById(horario);
      if(!existehorario){
         return res.status(404).json({msg: 'Horario no encontrado'});
      }
      //Revisar si el horario actual pertence al usuario auth
      if(existehorario.creador.toString() !== req.usuario.id){
         return res.status(401).json({msg: 'No Autorizado'});
      }

      //Crear la materia
      const materia = new Materia(req.body);
      await materia.save();
      res.json({materia});

   } catch (error) {
      console.log(error);
      res.status(500).send('Error en materia controller metodo crear');
   }

}
 
//-------------------------------------
//    Mostrar materias por Horario
//====================================
exports.obtenerMaterias = async (req,res) =>{
   
   try {
      //Extraer el horario y comprobar si existe
      const {horario} = req.body;
      const existehorario = await Horario.findById(horario);
      if(!existehorario){
         return res.status(404).json({msg: 'Horario no encontrado'});
      }
      //Revisar si el horario actual pertence al usuario auth
      if(existehorario.creador.toString() !== req.usuario.id){
         return res.status(401).json({msg: 'No Autorizado'});
      }

      //Obtnener materias por horario
      const materias = await Materia.find({horario});
      res.json({materias});

   } catch (error) {
      console.log(error);
      res.status(500).send('Error en materia controller, metodo mostrar');
   }
}


//-------------------------------------
//    Mostrar materias por Horario
//====================================
exports.eliminarMateria = async (req,res) =>{

   try {
      //extraer el horario y comprobar si existe
      const {horario} = req.body;
      //si la materia existe o no
      
      let materia = await Materia.findById(req.params.id);

      if(!materia){
         return res.status(404).json({msg:'Esa materia no existe'});
      }

      //extraer horario
      const existehorario = await Horario.findById(horario);
      //Revisar si el horario actual pertence al usuario auth
      if(existehorario.creador.toString() !== req.usuario.id){
         return res.status(401).json({msg: 'No Autorizado'});
      }

      //Eliminar
      await Materia.findOneAndRemove({_id:req.params.id});
      res.json({msg:'Materia eliminada'}); 
      
   } catch (error) {
      console.log(error);
      res.status(500).send('Error en materia Controller, metodo Eliminar');  
   }
}