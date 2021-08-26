"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');

const routes = new (0, _express.Router)();

routes.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    })
})


exports. default = routes;


