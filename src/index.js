
import express from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path';

// middleware


import './database';

class App{
    constructor(){
        this.server = express()
        this.midlleware()
        this.routes()
 
    }

    //mediar as comunicações
    midlleware(){
        this.server.use(cors())
        this.server.use(express.json())
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
    }
    //centralizar as rotas
    routes(){
        this.server.use(routes)
    }
}

export default new App().server;