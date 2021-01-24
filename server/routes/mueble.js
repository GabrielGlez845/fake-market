const express = require('express');
const _ = require('underscore');
const { cors } = require('../midlewares/cors');
const Mueble = require('../models/mueble');

const app = express();

//Mostrar  los muebles por un id 
app.get('/muebles/:id', cors, (req, res) => {

    let id = req.params.id;

    Mueble.findById(id, (err, muebleDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            mueble: muebleDB
        });
    })

    /*
        Mueble.find({ _id: id })
            .exec((err, muebles) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Mueble.count((err, conteo) => {

                    res.json({
                        ok: true,
                        muebles,
                        cuantos: conteo
                    });

                });


            });

    */

});

//Segun su categoria 
app.get('/muebles/:categoria', cors, (req, res) => {

    let Categoria = req.params.categoria;
    //Parametros opcionales 
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 7;
    limite = Number(limite);

    Mueble.find({ categoria: Categoria })
        .skip(desde)
        .limit(limite)
        .exec((err, muebles) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Mueble.count((err, conteo) => {

                res.json({
                    ok: true,
                    muebles,
                    cuantos: conteo
                });

            });


        });


});

//Segun su categoria y tipo
app.get('/muebles/:categoria/:tipo', cors, (req, res) => {

    let Categoria = req.params.categoria;
    let Tipo = req.params.tipo;
    //Parametros opcionales 
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 8;
    limite = Number(limite);

    Mueble.find({ categoria: Categoria, tipo: Tipo })
        .skip(desde)
        .limit(limite)
        .exec((err, muebles) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Mueble.count((err, conteo) => {

                res.json({
                    ok: true,
                    muebles,
                    cuantos: conteo
                });

            });


        });


});


//Dont matters
//Agregar un nuevo mueble
app.post('/muebles', cors, function(req, res) {

    let body = req.body;

    let mueble = new Mueble({
        nombre: body.nombre,
        categoria: body.categoria,
        tipo: body.tipo,
        img: body.img,
        cantidad: body.cantidad,
        precio: body.precio,
        oferta: body.oferta
    });


    mueble.save((err, muebleDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            mueble: muebleDB
        });


    });


});
//Modificar el precio y si tiene una oferta
app.put('/muebles/:id', cors, function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['precio', 'oferta']);

    Mueble.findByIdAndUpdate(id, body, { new: true }, (err, muebleDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            mueble: muebleDB
        });

    })

});


//Modificar la cantidad de un mueble
app.put('/muebles/:id', cors, function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['cantidad']);

    Mueble.findByIdAndUpdate(id, body, { new: true }, (err, muebleDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            mueble: muebleDB
        });

    })

});

//Elimiar un mueble
app.delete('/muebles/:id', cors, function(req, res) {


    let id = req.params.id;

    // Usuario.findByIdAndUpdate(id, (err, usuarioBorrado) => {


    Mueble.findByIdAndRemove(id, { new: true }, (err, usuarioBorrado) => {

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