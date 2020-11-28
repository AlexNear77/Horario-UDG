//------------IMPORTS----------------
const express = require('express');
const conectarDB = require('./config/db');

//--------------------------------------
//        Creacion del servidor        
//=====================================
const app = express();

//--------------------------------------
//        Conexion a la BD        
//=====================================
conectarDB();

//--------------------------------------
//        Habilitar expres.json        
//=====================================
app.use(express.json({extended: true}));

//--------------------------------------
//        Creacion del puerto        
//=====================================
const PORT = process.env.PORT || 4000;

//--------------------------------------
//         Importacion de RUTAS        
//=====================================
app.use('/api/usuarios', require('./routes/usuarios'));  
app.use('/api/auth', require('./routes/auth'));  

//--------------------------------------
//           Iniciando sever        
//=====================================
app.listen(PORT, () =>{
   console.log(`Corriendo servidor en el puerto ${PORT}`);
});