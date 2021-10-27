<template>
    <div class="addCultivo">
        <div class=imagen>
            <img src="../images/mazorca.svg" height="500" width="500">
        </div>
        <div class="containerAddCultivo">

            <h3 id="header">Registra un nuevo cultivo</h3>
            <br>
            <form v-on:submit.prevent="processAddCultivo">

                <select v-model="cultivo.transaction_data.alimentoSembrado">
                    <option value="" disabled selected>Alimento a Sembrar</option>
                    <option v-for="alimento in alimentos" :key="alimento.id" :value="alimento.id">{{ alimento.nombre }}</option>
           
                </select>
                <br>
                <input type="number" placeholder="Hectareas" v-model="cultivo.transaction_data.hectareas">
                <br>

                <select v-model="cultivo.transaction_data.pais">
                    <option value="" disabled selected>País</option>
                    <option v-for="pais in paises" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
                </select>
                
                <input type="text" placeholder="¿Otro? Cuál" v-model="cultivo.transaction_data.nombrePais">
                
                <select v-model="cultivo.transaction_data.region">
                    <option value="" disabled selected>Región</option>
                    <option v-for="region in regiones" :key="region.id" :value="region.id">{{ region.nombre }}</option>
                </select>
                
                <br>

                <input type="text" placeholder="Otra ¿Cuál?" v-model="cultivo.transaction_data.nombreRegion">

                <br>
                <br>
                
                <button id ="butCrearCultivo" type="submit">Crear</button>


            </form>

        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import jwt_decode from 'jwt-decode';

    export default {
        name: "addCultivo",
        
        data: function(){
            return {
                cultivo : {
                    "user_id" : 0,
                    "transaction_data": {
                        "alimentoSembrado"   : 0,
                        "zonaCultivo"        : 0, 
                        "hectareas"          : 0, 
                        "fecha"              : (new Date()).toJSON().toString(), 
                        "pais"               : 0,
                        "region"             : 0,
                        "nombrePais"         : "",
                        "nombreRegion"       : ""
                     }
                },

                alimentos : [],
                paises    : [],
                regiones  : []
            }
        },

        methods: {

            processAddCultivo: async function(){
                console.log(localStorage.getItem("tokenAccess"))
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = jwt_decode(token).user_id.toString();
                this.cultivo.user_id = parseInt(userId);

                console.log(this.cultivo)
                console.log(this.cultivo.user_id);

                axios.post(
                    'http://localhost:8000/cultivo/create/',
                    this.cultivo,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    console.log("Then");
                    alert("El cultivo fue creado exitosamente")
                    this.$emit("completedTransaction");
                })
                .catch((error) => {
                    console.log(error);
                    if(error.response.status == "401") {

                        console.log(error.response)
                        alert("Usted no está autorizado para realizar esta operación.");
                    }
                    else if(error.response.status == "400"){
                        alert("La transacción no se pudo procesar correctamente.\nRevise todos los datos e intente de nuevo.");
                    }
                })
                
            },

            
            verifyToken: async function(){
                return axios.post(
                        'http://localhost:8000/refresh/',
                        {refresh: localStorage.getItem("tokenRefresh")},
                        {headers:{}}
                    )
                    .then((result) => {
                        localStorage.setItem("tokenAccess", result.data.access);
                    })
                    .catch((error) => {
                        this.$emit("logOut");
                    })
            },


            getPaisesList : async function() {
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                /*Le sacamos el usuario que viene implícito en el token que sirve pa la URL*/
                let userId = jwt_decode(token).user_id.toString();

                axios.get(
                    `http://localhost:8000/paises/${userId}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    this.paises = result.data;
                })
                .catch((error) => {
                    if(error.response.status == "401") {
                        alert("No autorizado para realizar esta petición.");
                    }
                    else if(error.response.status == "500"){
                        alert("La plataforma está presentando inconvenientes.\nIntente de nuevo más tarde.");
                    }
                })
            },

            getRegionesList : async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                /*Le sacamos el usuario que viene implícito en el token que sirve pa la URL*/
                let userId = jwt_decode(token).user_id.toString();

                axios.get(
                    `http://localhost:8000/regiones/${userId}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    this.regiones = result.data;
                })
                .catch((error) => {
                    if(error.response.status == "401") {
                        alert("No autorizado para realizar esta petición.");
                    }
                    else if(error.response.status == "500"){
                        alert("La plataforma está presentando inconvenientes.\nIntente de nuevo más tarde.");
                    }
                })
            },

            getAlimentosList : async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = jwt_decode(token).user_id.toString();

                axios.get(
                    `http://localhost:8000/alimentos/${userId}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    this.alimentos = result.data;
                })
                .catch((error) => {
                    if(error.response.status == "401") {
                        alert("No autorizado para realizar esta petición.");
                    }
                    else if(error.response.status == "500"){
                        alert("La plataforma está presentando inconvenientes.\nIntente de nuevo más tarde.");
                    }
                })                
            },
        },

        created: async function(){
            this.getPaisesList();
            this.getRegionesList();
            this.getAlimentosList();
        }

}
</script>

<style>
    .addCultivo{
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0%;
        display: flex;
        align-items: center;
    }

    .imagen{
        position: absolute;
        right : 0px;
    }

    .containerAddCultivo
    {
        position: absolute;
        left : 200px;
        border: 3px solid #3D550C;
        border-radius: 15px;
        width: 32%;
        height: 50%;
    }

    p{
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
    }
    
    #header {
        background-color: #1A981A;
        padding-top:12px;
        height: 30px;
        align-items: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    select, input { border: 1px solid gray; }

    input{
        color:black;
        height: 30px;
        width: 88%;
        margin-bottom:10px;
        margin-left:10px;
        vertical-align: bottom;
        margin-right:12px;
    }

    select {
        background-color:white;
        color: black;
        width: 90%;
        height:35px;
        margin-bottom: 10px;
        vertical-align: bottom;
        margin-left:10px;
        margin-right:12px;
    }

    #butCrearCultivo {
        height:36px;
        width:180px;
        background-color:#1A981A;
        color:white;
    }

    #butCrearCultivo:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }


</style>