<template>
    <div class="displayCultivos">
        <div class="containerDisplayCultivos">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Alimento</th>
                        <th>Hectareas</th>
                        <th>Fecha</th>
                        <th>País</th>
                        <th>Region</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cultivo in cultivos" :key="cultivo.id">
                        <td>{{cultivo.id}}</td>
                        <td>{{cultivo.alimento_sembrado.nombre}}</td>
                        <td>{{cultivo.hectareas}}</td>
                        <td>{{cultivo.fecha}}</td>
                        <td>{{cultivo.zonaCultivo.pais}}</td>
                        <td>{{cultivo.zonaCultivo.region}}</td>
                    </tr> 
                </tbody>
            </table>
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
                cultivos : []
            }
        },

        methods: {    
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
            
            getAllCultivos: async function(){
                    if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = jwt_decode(token).user_id.toString();                
                axios.get(
                    `http://localhost:8000/cultivo/${userId}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    this.cultivos = result.data;
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
            this.getAllCultivos();
            console.log(this.cultivos)
        }

}
</script>

<style>
    .displayCultivos{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .containerDisplayCultivos {
        width: 80%;
        height: 75%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    table {
        table-layout: fixed;
        width: 80%;
        height: 70%;
        border-collapse: collapse;
        border: 1.5px solid black;
    }
    td{
        font-size: 0.9em;

    }

    thead tr th{
        background-color:#1A981A;
        align-items: center;
        align-content:center;
        justify-content: center;
        padding: 5px 5px 8px 5px;
        font-size: 1.2em;
        text-decoration: underline;
    }

    tbody tr:nth-child(even) {
       background-color: #59981A;
    }

</style>