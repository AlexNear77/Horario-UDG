const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//----------------------------------------
//             Crea Horarios
//=======================================
//          endpoint: api/horarios
router.post('/', 
   auth,
   [
      check('nombre','El nombre del horario es obligatorio').not().isEmpty()
   ],
   horarioController.crearHorario
);

//----------------------------------------
//             Mostrar Horarios
//=======================================
router.get('/', 
   auth,
   horarioController.obtenerHorarios
);

//----------------------------------------
//             Actualizar Horario
//=======================================
router.put('/:id',
   auth,
   [
      check('nombre','El nombre del horario es obligatorio').not().isEmpty()
   ],
   horarioController.actualizarHorarios
);

//----------------------------------------
//             Eliminar Horario
//=======================================
router.delete('/:id',
   auth,
   horarioController.eliminarHorario
)

module.exports = router;