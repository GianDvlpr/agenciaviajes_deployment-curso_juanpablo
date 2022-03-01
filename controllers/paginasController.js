import { Viaje } from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js'

const paginaInicio = async (req, res) => {

    //Consultar 3 viajes del modelo viaje

    const promiseDB = []

    promiseDB.push(Viaje.findAll({ limit: 3 }))
    promiseDB.push(Testimonial.findAll({ limit: 3 }))

    try {
        const resultado = await Promise.all(promiseDB)
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
    } catch (error) {
        console.log(error)
    }

}

const paginaNostros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}

const paginaViajes = async (req, res) => {
    //Consultar la base de datos 
    const viajes = await Viaje.findAll()
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    })
}

const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })
    } catch (error) {
        console.log(error)
    }
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;
    try {
        const viaje = await Viaje.findOne({ where: { slug } })
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNostros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}