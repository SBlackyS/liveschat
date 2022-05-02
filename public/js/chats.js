const socket = io();
const btnEnviar = document.querySelector('#btnEnviar');
let msgEnviar = document.querySelector('#msgEnviar');
const mail = localStorage.getItem("correo");
// console.log("ESTEEEEEEE " + mail);

let idTemp = [];
const btnChatCorreo = document.querySelector('#btnChatCorreo');

btnChatCorreo.addEventListener('click', () => {
    const chatNombre = document.querySelector('#chatCorreo').value;
    document.getElementById('chatN').innerText = chatNombre;
    socket.emit('privado-ID', chatNombre, (callback) =>{
        console.log(callback);
        idTemp = callback;
    })
});

btnEnviar.addEventListener('click', () => {
    const msg = msgEnviar.value;
    console.log(idTemp.ids[0]);
    for(let i = 0; i<idTemp.ids.length; i++){
        socket.emit('mensaje-privado', msg, idTemp.ids[i])
    }
});

socket.on('msg-privado', (msg) => {
    const msgBox = document.getElementById('msgPrivados');
    const msgContBox = document.createElement("p");
    const saltoBox = document.createElement("br");
    const txt = document.createTextNode(msg);
    console.log(msg);
    msgContBox.appendChild(txt);
    msgBox.appendChild(txt);
    msgBox.appendChild(saltoBox);
})
socket.on('registrar-socketID', (id, callback) => {
    console.log("Entre al chat. ");
    return callback ({
        correo,
        id
    })
});

    const igual = [];
socket.on('extraer-online',  (elementos) => {
    console.log(elementos + "");
    let condicion;
    for(let i = 0; i < elementos.length; i++){
        const { correo, id } = elementos[i];
        if(igual[0]===undefined){igual.push(correo);}
        for(let n = 0; n<igual.length; n++){
            if(correo == igual[n]){
                condicion = false;
                n = igual.length;
            } else {
                condicion = true;
            }
        }
        if(condicion===true){
            igual.unshift(correo);
            const mail = localStorage.getItem("correo");
            const container = document.createElement("div");
            let msg;
            if(mail !== igual[1]){
                msg = document.createTextNode(igual[1]);
            } else {
                msg = document.createTextNode(igual[0]);
            }
                container.appendChild(msg);
                document.getElementById('correosUsuarios').appendChild(container);
        }
    }
})
