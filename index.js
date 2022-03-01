// const express = require('express')
import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'
import 'dotenv/config'

const app = express()

//Conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(err => console.log(err))

//Definir puerto
// const port = process.env.PORT || 4000

//Habilitar PUG
app.set('view engine', 'pug')

//Obtener el año actual 
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear()
    res.locals.nombreSitio = 'Agencia de Viajes'
    return next()
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extented: true }))

//Definir la carpeta publica
app.use(express.static('public'))

//Agregar router
app.use('/', router)

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 4000
app.listen(port, host, ()=>{
    console.log('El servidor esta funcionando')
});
