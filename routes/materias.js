const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//----------------------------------------
//             Crea Materias
//=======================================
//          endpoint: api/materias
router.post('/',
   auth,
   [
      check('nrc','El NRC es obligatorio').not().isEmpty()
   ],
   materiaController.crearMateria
);
//----------------------------------------
//       Mostrar Materias por Horario
//=======================================
router.get('/',
   auth,
   materiaController.obtenerMaterias
);
//----------------------------------------
//             Eliminar materia
//=======================================
router.delete('/:id',
   auth,
   materiaController.eliminarMateria
);

module.exports = router;