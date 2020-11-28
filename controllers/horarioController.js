const Horario = require('../models/Horario');
const { validationResult} = require('express-validator');
const { compareSync } = require('bcryptjs');

//-----------------------------------------
//          Creacion de Horario
//========================================
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

//-----------------------------------------
//          Mostrar de horario
//========================================
exports.obtenerHorarios = async (req,res) =>{
   try {
      //Nota: Tenemos en el req.body gracias al middleware auth el id del usuario logeado ergo...
      const horarios = await Horario.find({creador: req.usuario.id}).sort({creado: -1});
      res.json({horarios});
      
   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un errror');
   }
}

//-----------------------------------------
//          Actualizar horario
//========================================
exports.actualizarHorarios = async (req,res) =>{
   
   //revisando si hay errores
   const errores = validationResult(req);
   if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()})
   }

   //Extraer la informacion del horario
   const {nombre} = req.body;
   const nuevoHorario = {};

   if(nombre){
      nuevoHorario.nombre = nombre;
   }

   try {

      //Revisar id
      let horario = await Horario.findById(req.params.id);
      //Revisar si existe el horario
      if(!horario){
         return res.status(404).json({msg:'Horario no encontrado'});
      }
      //Verificar el creador de horario
      if(horario.creador.toString() !== req.usuario.id){
         return res.status(401).json({msg: 'No Autorizado'});
      }
      //actualizar
      horario = await Horario.findOneAndUpdate({_id: req.params.id},{$set: nuevoHorario}, {new:true});

      res.json({horario});

   } catch (error) {
      console.log(error);
      res.status(500).send('Error en el Controlador horario, metodo actualizar')
   }

}

//-----------------------------------------
//            Eliminar horario
//========================================
exports.eliminarHorario = async (req,res) =>{
   try {
      //Revisar id
      let horario = await Horario.findById(req.params.id);
      //Revisar si existe el horario
      if(!horario){
         return res.status(404).json({msg:'Horario no encontrado'});
      }
      //Verificar el creador de horario
      if(horario.creador.toString() !== req.usuario.id){
         return res.status(401).json({msg: 'No Autorizado'});
      }
      //Eliminar horario
      await Horario.findOneAndRemove({ _id: req.params.id});
      res.json({msg:'Horario eliminado'});

   } catch (error) {
      console.log(error);
      res.status(500).send('Error en el controlador Horario, metodo eliminar');
   }
}
