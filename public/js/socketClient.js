const txtMensaje = document.querySelector('#msgSend');
const btnEnviar = document.querySelector('#btnEnviar');
const socket = io();

const nombre = localStorage.getItem("nombre");

socket.on('registrar-socketID', (id, callback) => {
    return callback ({
        correo,
        id
    })  
});

socket.on('disconnect', () => {});

socket.on('enviar-mensaje', ( payload ) =>{
    //Para mostrar en pantalla
    const msg = document.createElement("p");
    const salto = document.createElement('br');
    const txtMsg = document.createTextNode(payload.nombre+": "+payload.mensaje);
    msg.appendChild(txtMsg,);
    document.getElementById('recibir').appendChild(txtMsg);
    document.getElementById('recibir').appendChild(salto);
})

btnEnviar.addEventListener('click', () =>{
    const mensaje = txtMensaje.value;
    const payload = { //Puede ser cualquier nombre.
        mensaje,
        nombre
    }
    socket.emit('enviar-mensaje', payload, (id) => {    });
})
