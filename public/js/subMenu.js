let naviCon = document.querySelector('#navCon');
let container_user = document.querySelector('#container-user');
let sub_menu = document.querySelector('#subMenu');
let nombreSubMenu = document.querySelector('.nombreUser');
const nombreSub = localStorage.getItem("nombre");
nombreSubMenu.innerText = nombreSub;
// let naviCon_Padre = document.querySelector('#navCon-Padre');
let contNavi = 0;

const navCon = () => {
    if(contNavi === 0){
        naviCon.classList.add("navCon-Inactivo");
        sub_menu.classList.add('subMenu');
        container_user.style="display:block !important";    
        // naviCon_Padre.classList.add('navCon-Padre-Inactivo');
        

        contNavi = 1;
    }else{
        naviCon.classList.remove('navCon-Inactivo');
        sub_menu.classList.remove('subMenu');
        document.querySelector('#container-user').style="display:none";
        contNavi = 0;
    }
    
}   