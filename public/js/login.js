const socket = io();

let aSesion = document.querySelector('#sesionStart');
let aRegister = document.querySelector('#sesionRegister');

//Iniciar Sesion
let correoSesion = document.querySelector('#correoSesion');
let passwordSesion = document.querySelector('#passwordSesion');
const btnIniciar = document.querySelector('#btnIniciar');

//Registrar Usuario
let correoRegister = document.querySelector('#correoRegister');
let passwordRegister = document.querySelector('#passwordRegister');
let passwordRegister2 = document.querySelector('#passwordRegister2');
let nameRegister = document.querySelector('#nameRegister');
const btnRegistrar = document.querySelector('#btnRegistrar');

socket.on('connect', () => {
    console.log('conectado');
})

socket.on('disconnect', () => {
    console.log('Desconectado' + socket.id); 
})

btnRegistrar.addEventListener('click', () => {
    const correo = correoRegister.value;
    const pass = passwordRegister.value;
    const nombre = nameRegister.value;
    
    socket.emit('registrar-usuario',  {correo, pass, nombre}, ( callback ) => {
    } )

})

btnIniciar.addEventListener('click', () => {
    const corre = correoSesion.value;
    const pas = passwordSesion.value;
    socket.emit('iniciar-sesion', {corre, pas }, (callback) => {
        const { correo, nombre, id } = callback;
        let auxCorreo = correo;
        let auxNombre = nombre;
        localStorage.setItem("correo", auxCorreo);
        localStorage.setItem("nombre", auxNombre);
        localStorage.setItem("id", id);
        if(localStorage.getItem("correo") != "undefined"){
            window.location.href= '../index.html';
        }
    })
    
})

const sesionStart = () => {
    aSesion.style.display="block";
    aRegister.style.display="none";

}

const sesionRegister = () => {
    aSesion.style.display="none";
    aRegister.style.display="block";

}