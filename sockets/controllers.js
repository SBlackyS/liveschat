
const UsuarioControl = require('../models/user-control');
const usuarioControl = new UsuarioControl;
let infoUser = [];
let condicional;

const socketController = (socket) =>{
    const id = socket.id;
    socket.on('disconnect', () =>{
        const id = socket.id;
            // console.log("Este es mi id::: " + id);
            const borrarID = usuarioControl.borrarONID(id);
        console.log( 'Cliente Desconectado', socket.id );
        for(let i = 0; i<infoUser.length;i++){
            if(infoUser[i].id == id){
                infoUser.splice(i,1);
            }
        }
    })

    socket.on('mensaje-privado', (msg, identi) => {
        socket.broadcast.to(identi).emit('msg-privado', msg);
        socket.emit('msg-privado', msg);
    })

    socket.emit('registrar-socketID', id, (callback) => {
        console.log(id);
        const registerID = usuarioControl.registrarONID(callback);
        infoUser.push(callback);
        socket.broadcast.emit('extraer-online', infoUser);
        socket.emit('extraer-online', infoUser);
    })

    socket.on('privado-ID', (mail,callback) => {
        const privateTO = usuarioControl.obtenerAllID(mail);
        console.log(privateTO);
        const long = privateTO.length;
        let ids = [];

        for(let i = 0; i<long;i++){
            ids.push(privateTO[i].id);
        }

        return callback({
            ids
        })

    })

    socket.on('enviar-mensaje', (payload, callback) => {//Está recibiendo el evento 'enviar-mensaje' junto con su parámetro payload (Puede ser cualquier nombre)
        const id = 123;
        callback(id);
        socket.broadcast.emit('enviar-mensaje', payload );
        socket.emit('enviar-mensaje', payload);
    })
    
    socket.on('registrar-usuario', (payload, callback) =>{
        // const {correo, nombre, pass} = payload;
        const register = usuarioControl.registrar(payload);

    } )
    
    socket.on('iniciar-sesion', (datos, callback) => {
        datos.id = socket.id;
        const sesion = usuarioControl.iniciarSesion(datos);
        if(sesion){
            return callback ({
                correo: sesion.correo,
                nombre: sesion.nombre,
                id: sesion.id
            });
        } else {
            return callback ({
                msg:"nada"
            });
        }
    })

}

module.exports = {
    socketController
}