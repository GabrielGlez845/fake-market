const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



let Schema = mongoose.Schema;


let clienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    telefono: {
        type: String,
        unique: true,
        required: [true, 'El telefono es necesario']
    },
    calle: {
        type: String,
        required: [true, 'La calle es necesaria']
    },
    colonia: {
        type: String,
        required: [true, 'La colonia es necesaria']
    },
    estado: {
        type: String,
        required: [true, 'El estado es necesario']
    },
    borrado: {
        type: Boolean,
        default: true
    }
});


clienteSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });


module.exports = mongoose.model('Cliente', clienteSchema);