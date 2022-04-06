let aSesion = document.querySelector('#sesionStart');
let aRegister = document.querySelector('#sesionRegister');
const sesionStart = () => {
    aSesion.style.display="block";
    aRegister.style.display="none";

}

const sesionRegister = () => {
    aSesion.style.display="none";
    aRegister.style.display="block";
} 