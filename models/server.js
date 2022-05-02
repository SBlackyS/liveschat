const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controllers');
// const login = require('../public/js/login');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require( 'http' ).createServer( this.app );
        this.io = require( 'socket.io' )( this.server );

        this.paths = { };

        //Usuario
        // this.user = { };

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {

    }
    
    sockets(){
        this.io.on('connection', socketController);
        // this.nombre=document.querySelector('#nombre');
    }

   listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;