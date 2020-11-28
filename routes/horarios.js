const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');



//----------------------------------------
//             Crea Horarios
//=======================================
//          endpoint: api/horarios
router.post('/', 
   horarioController.crearHorario
);

module.exports = router;