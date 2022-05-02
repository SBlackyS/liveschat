const path = require('path');
const fs = require('fs');

class UsuarioControl {
    constructor(){
        this.total = 0;
        this.usuarios = [];
        // this.init();
    }

    get toJson(){
        return {
            total: this.total,
            usuarios: this.usuarios
        }
    }

    get toJsonto(){
        return {
            online: this.total,
            user: this.usuarios
        }
    }

    get toJsontoto(){
        return {
            online: this.total,
            user: this.usuarios
            
        }
    }
    // init(  ){
    //     const { total, usuarios} = require('../db/id.json');
    //     if(total === this.total){
    //         this.usuarios = usuarios;
    //     } else {
    //         // this.usuarios.push(this.registrar);    
    //         this.guardarONID();
    //     }

    //     // if(this.total === total);{
    //     // }
    // }

    guardarDB(){
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    guardarON(){
        const dbPath = path.join(__dirname, '../db/online.json');
        fs.writeFileSync(dbPath,JSON.stringify(this.toJsonto));
    }

    guardarONID(){
        const dbPath = path.join(__dirname, '../db/id.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJsontoto));
    }
    registrar(correo){
        this.total += 1;
        // const usuario = new Usuario(this.registro);
        console.log(correo);
        this.usuarios.push(correo);

        this.guardarDB();

        return 'Guardado el registro ' + this.usuarios.total;
    }

    registrarON(datos){
        this.total += 1;
        this.usuarios.push(datos);
        this.guardarON();
        console.log(datos);
    }

    registrarONID(socketID){
        // console.log(socketID);
        this.total += 1;
        this.usuarios.push(socketID);
        this.guardarONID();
    }

    borrarONID(socketID){
        console.log(socketID);
        this.total -= 1;
        for (let i = 0; i < this.usuarios.length; i++) {
            const element = this.usuarios[i].id;
            console.log(element);
            console.log(this.usuarios.length);
            if(element == socketID){
                console.log(this.usuarios[i]);
                console.log(this.usuarios);
                this.usuarios.splice(i,1);
                // console.log(this.usuarios[i] + "Nuevo valor en la posicion.. ");
                console.log(this.usuarios);
                this.guardarONID();
                return "Borrado ";
            }else{
                console.log(this.usuarios[i] + " ESTE NO SE BORRA");
            }
            
        }
        // this.guardarONID();
        return false;
        
        // console.log(socketID);
    }
    iniciarSesion(datos){
        const { usuarios } = require('../db/data.json');
        const total = usuarios.length;
        const mail = datos.corre;
        const password = datos.pas;
        console.log(datos);
        let on = false;
        for( let i=0; i < total ; i++){
            const { correo, pass, nombre } = usuarios[i];
            console.log( correo + password + " Soy el del registro");   
            if(correo === mail){ 
                console.log("YES");
                for(let n = 0; n < total; n++){
                    if( password == pass){
                        console.log("password Correcta");
                        datos.nombre = nombre;
                        this.registrarON(datos);
                        console.log("Se envió");
                        const sesion = ({
                            correo: correo,
                            nombre: nombre,
                            id: datos.id
                        });
                        return sesion;
                    } else { console.log( "password incorrecta" );}
                }
            } else {
                    const msg = "Error en el inicio de sesión. ";
                    console.log(msg + i); 
            }
        }
    }

    obtenerAllID(correo){
        const { user } = require('../db/id.json');
        let datos = [];
        for(let i = 0; i<user.length;i++){
            if(user[i].correo == correo){
                datos.push(user[i]);
            } else {
                console.log("Correo Diferente " + i);
            }
        }
        return datos;
    }

    datosOnline(){
        const { user } = require('../db/id.json');
        this.guardarONID();
        return user;
    }
}

module.exports = UsuarioControl;