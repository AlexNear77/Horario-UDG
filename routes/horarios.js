const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');
const auth = require('../middleware/auth');


//----------------------------------------
//             Crea Horarios
//=======================================
//          endpoint: api/horarios
router.post('/', 
   auth,
   horarioController.crearHorario
);

//----------------------------------------
//             Mostrar Horarios
//=======================================
//          endpoint: api/horarios
router.get('/', 
   auth,
   horarioController.crearHorario
);

module.exports = router;