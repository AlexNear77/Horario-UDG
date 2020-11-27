//-------------------------------------------------
//               RUTAS DE USUARIOS
//================================================
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');


//----------------------------------------
//             Crea un usuario
//=======================================
//          endpoint: api/usuarios
router.post('/',
   [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'Agrega un email valido').isEmail(),
      check('password','La contraseña debe ser minimo de 6 caracteres').isLength({min:6}),
      check('carrera','La clave de la carrera debe ser solo 4 carcteres').isLength({ min: 4, max:4 }),
      check('centro','El centro universitario es obligatorio').not().isEmpty()
   ],
   usuarioController.crearUsuario
);

module.exports = router;
