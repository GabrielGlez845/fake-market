const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let muebleSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    categoria: { //Categora principal
        type: String,
        required: [true, 'La categoria es necesaria']
    },
    tipo: { // Categoria secundaria 
        type: String,
        required: [true, 'El tipo es necesario']
    },
    img: {
        type: String,
        required: [true, 'La imagen es necesaria']
    },
    cantidad: {
        type: String,
        required: [true, 'La cantidad es necesaria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es necesario']
    },
    oferta: {
        type: String,
        default: 0
    }
});



module.exports = mongoose.model('Mueble', muebleSchema);