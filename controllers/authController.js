const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req,res) =>{
   //revisando si hay errores
   const errores = validationResult(req);
   if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()})
   }

   //extrer email y password
   const { email, password} = req.body;
    try {
      // Revisar que sea un usuario registrado 
      let usuario = await Usuario.findOne({email});
      if(!usuario){
         return res.status(400).json({msg: 'Correo incorrecto'});
      } 

      // Revisar el password
      const passCorrecto  = await bcryptjs.compare(password, usuario.password);

      if(!passCorrecto){
         return res.status(400).json({msg:'Password incorrecto'})
      }

      // Si es correcto  Crear  el JWT
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
         res.json({token});
      });

    } catch (error) {
       console.log(error);
    }
}