//-------------------------------------------------
//            RUTAS DE AUTENTICACION
//================================================
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


//----------------------------------------
//               autenticacion
//=======================================
//          endpoint: api/auth
router.post('/',
   authController.autenticarUsuario
);

//----------------------------------------
//               obtener usuario
//=======================================
router.get('/',
   auth,
   authController.usuarioAutenticado
);

module.exports = router;
