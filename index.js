//------------IMPORTS----------------
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//--------------------------------------
//        Creacion del servidor        
//=====================================
const app = express();

//--------------------------------------
//        Conexion a la BD        
//=====================================
conectarDB();

//--------------------------------------
//        Habilitar cors        
//=====================================
app.use(cors());

//--------------------------------------
//        Habilitar expres.json        
//=====================================
app.use(express.json({extended: true}));

//--------------------------------------
//        Creacion del puerto        
//=====================================
const port = process.env.PORT || 4000;

//--------------------------------------
//         Importacion de RUTAS        
//=====================================
app.use('/api/usuarios', require('./routes/usuarios'));  
app.use('/api/auth', require('./routes/auth'));  
app.use('/api/horarios', require('./routes/horarios'));  
app.use('/api/materias', require('./routes/materias'));  
app.use('/api/udg', require('./routes/udg'));  

//--------------------------------------
//           Iniciando sever        
//=====================================
app.listen(port, '0.0.0.0', () =>{
   console.log(`Corriendo servidor en el puerto ${port}`);
});