const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


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

      // Crear  el JWT
      const payload = {
         usuario:{
            id: usuario.id
         }
      };
      //Firmando el JWT
      jwt.sign(payload,process.env.SECRETA,{
         expiresIn: 10800 // 3 horas
      },(error,token) =>{
         if(error) throw error;
         //menaje
         res.json({token:token});
      });
 

   } catch (error) {
      console.log(error);
      res.status(400).send('Error en usuarioController metodo crearUsuario');
   }
}