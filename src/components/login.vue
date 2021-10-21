<template>
    <div class="loginUser">
        <div class="containerLoginUser">
            <div class="superior-panel">
                <h2>¡Ingrese ahora!</h2>
            </div>
            <form v-on:submit.prevent="processLogInUser" method="POST">
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                <input type="password" v-model="user.password" placeholder="Password">
                <br>
                <br>
                <button type="submit">Iniciar Sesion</button>
            </form>
        </div>
    </div>
</template>

<script>
    //import axios from 'axios';
    export default {
        name: "LogIn",
        
        data: function(){
            return {
                user: {
                    username:"",
                    password:""
                }
            }
        },
        methods: {
            /*
            processLogInUser: function(){
                axios.post(
                    "http://localhost:8000/login/",
                    this.user,
                    {headers: {}}
                )
                .then((result) => {
                    let dataLogIn = {
                        username     : this.user.username,
                        tokenAccess  : result.data.access,
                        tokenRefresh : result.data.refresh,
                    }
                    this.$emit('completedLogIn', dataLogIn)
                })
                .catch((error) => {
                    if (error.response.status == "401")
                        alert("ERROR 401: Credenciales Incorrectas.");
                });
            }
            */
        }
    }
</script>

<style>
    .loginUser{
        position:absolute;
        top:100px;
        margin: 0;
        padding: 0%;
        height: 70%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .containerLoginUser {
        border: 3px solid #3D550C;
        border-radius: 15px;
        width: 25%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .superior-panel{
        display:flex;
        background-color:#3D550C;
        height:15%;
        width:100%;
        align-items: center;
        align-content:center;
        justify-content: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

    }
    .superior-panel h2{
        color: white;
        font-size: 1.5rem;
        align-content:center;
    }

    .loginUser form{
        margin-top:30px;
        width: 70%;
        height: 100%;
    }
    .loginUser input{
        height: 45px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin-bottom: 20px;
        border: 1px solid #283747;
        color:black;
    }
    .loginUser button{
        width: 100%;
        height: 40px;
        color: #E5E7E9;
        background: #3D550C;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0;
    }
    .loginUser button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }
</style>