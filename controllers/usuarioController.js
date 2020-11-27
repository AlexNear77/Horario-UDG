const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


//-----------------------------------------
//          Creacion de usuario
//========================================
exports.crearUsuario = async (req,res) =>{

   //revisando si hay errores
   const errores = validationResult(req);
   if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()})
   }

   // extraer email y password
   const { email,password } = req.body;


   try {
      //Revisar que el usuario registrado sea unico 
      let usuario = await Usuario.findOne({email});

      if(usuario){
         return res.status(400).json({msg:'El usuario ya existe'});
      }

      //crear usuario
      usuario = new Usuario(req.body);

      //Hasheo de password
      const salt = await bcryptjs.genSalt(10);
      usuario.password = await bcryptjs.hash(password,salt);

      //guardar usuario
      await usuario.save();

      //menaje
      res.json({msg:'Usuario creado correctamente!'});

   } catch (error) {
      console.log(error);
      res.status(400).send('Error en usuarioController metodo crearUsuario');
   }
}