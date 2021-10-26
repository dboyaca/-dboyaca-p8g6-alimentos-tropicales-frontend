<template>
    <div class="Home">
        <h1> Bienvenido, {{ username }}</h1>
        <h3> Empieza a cultivar </h3>
        <button id="homebutton" v-on:click="loadAddCultivos">Quiero cultivar</button>
    </div>
</template>

<script>
    export default{
        name: "Home",
        /*Recuerde que esta función de data se carga antes de todo y por eso pone el username de una*/
        data: function(){
            return {
                username : localStorage.getItem("username")
            }
            
        },

        components:{

        },

        methods: {
            loadAddCultivos: function(){
                this.$router.push({name: "addcultivo"});
            }
        }
    }
</script>

<style>
    .Home{
        margin-top: 25%;
        padding: 0%;
        height: 100%;
        width: 100%;
        display: block;
        justify-content: center;
        align-items: center;
        align-content: center;
    }

    h3{
        color:whitesmoke;
    }

    #homebutton{
        margin-top:30px;
        background-color: #3D550C;
        color:white;
        width:200px;
    }

    #homebutton:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;        
    }

</style>
