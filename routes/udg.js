//-------------------------------------------------
//            RUTAS DE AUTENTICACION
//================================================
const express = require('express');
const router = express.Router();
const udgController = require('../controllers/udgController');
const auth = require('../middleware/auth');

//----------------------------------------
//               obtener materias
//=======================================
router.get('/',
   auth,
   udgController.obtenerMaterias
);

module.exports = router;