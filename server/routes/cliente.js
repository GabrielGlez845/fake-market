const express = require('express');
const _ = require('underscore');
const { cors } = require('../midlewares/cors');
const Cliente = require('../models/cliente');

const app = express();


app.get('/cliente', cors, (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Cliente.find({ estado: true })
        .skip(desde)
        .limit(limite)
        .exec((err, clientes) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Cliente.count({ borrado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    clientes,
                    cuantos: conteo
                });

            });


        });


});

app.post('/cliente', cors, function(req, res) {

    let body = req.body;

    let cliente = new Cliente({
        nombre: body.nombre,
        telefono: body.telefono,
        calle: body.calle,
        colonia: body.colonia,
        estado: body.estado
    });


    cliente.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            cliente: usuarioDB
        });


    });


});

app.put('/cliente/:id', cors, function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['telefono', 'calle', 'colonia', 'estado']);

    Cliente.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

app.delete('/cliente/:id', cors, function(req, res) {


    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        borrar: false
    };

    Cliente.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });



});



module.exports = app;