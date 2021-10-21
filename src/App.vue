<template>
  <div id="app" class="app">
    <div class="header">
      <img src="./images/logo.svg">
      <h1>Alimentos Tropicales de<br />Consumo Animal</h1>
      <nav>
        <div class="crops-menu">
          <button v-if="isAuth"> Visualizar Cultivos  </button>
          <button v-if="isAuth"> Actualizar Cultivos  </button>
          <button v-if="isAuth" v-on:click="loadAddCultivo"> Agregar Cultivos     </button>
          <button v-if="isAuth"> Eliminar Cultivos    </button> <!--Aqui llamar el consultar solo un alimento pa confirmarle al usuario-->
        </div>

        <div class="auth-menu">
          <button  v-if="!isAuth" v-on:click="loadLogIn">  Iniciar Sesión  </button>
          <button  v-if="!isAuth" v-on:click="loadSignUp"> Registrarse     </button>
          <button  v-if="isAuth" v-on:click="logOut">      Cerrar Sesión   </button>
        </div>
      </nav>
    </div>
    <div class="main-component">        
        <div class="custom-shape-main-component">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
        </svg>
      </div>

      <router-view
        v-on:completedLogIn="completedLogIn" 
        v-on:completedSignUp="completedSignUp"
        v-on:completedAddCultivo="completedAddCultivo"
      >
      </router-view>
    </div>

    <div class="footer">
      <h2>MisionTic 2022 - P8 - Grupo6 ©</h2>
    </div>
  </div>
</template>

<script>
  export default{
    name : 'App',

    data: function(){
      return {
        isAuth: false
      }
    },
    components:{
    },
    
    methods : {
      verifyAuth: function(){
        this.isAuth = localStorage.getItem("isAuth") || false;
        if(this.isAuth == false){
          this.$router.push({name: "login"})
        }
        else{
          this.$router.push({name: "home"});
        }
      },

      loadLogIn: function(){
        this.$router.push({name: "login"})
      },

      loadSignUp: function(){
        this.$router.push({name: "signup"})
      },
  /*
      loadAddCultivos: function(){
        console.log("Cargando")
        this.$router.push({name:"addcultivo"})
      },
      */

      completedLogIn: function(data){
        localStorage.setItem('username', data.username);
        localStorage.setItem('tokenRefresh', data.tokenRefresh);
        localStorage.setItem('tokenAccess', data.tokenAccess);
        localStorage.setItem('isAuth', true);
        alert("Autenticación exitosa");
        this.verifyAuth();
      },
      completedSignUp: function(data){
        alert("Registro exitoso");
        this.completedLogIn(data);
      },
/*
      completedAddCultivo: function(data){
        alert("Registro de cultivo exitoso")
      },
      */

    created : function(){
    }

  }
  }
  
</script>


<style>
.app{
  display:block;
}

* {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', sans-serif;
  text-align: center;
  color: white;
  margin:0;
}


.header{
  font-size: 1rem;
  display:flex;
  background-image: linear-gradient(#81B622,#59981A);
  width: 97vw;
  height: 10vh;
  padding-left: 20px;
  padding-right: 20px;
}

.header h1{
  padding-top: 28px;
  font-size:0.8em;
}
/* PANEL BOTONES AUTENTICACIÓN */
  .auth-menu{
    position:absolute; 
    right:30px;
    padding-top:30px
    }

  .crops-menu{
    position:absolute; 
    right:150px;
    padding-top: 27px;
    
  }

/* BOTONES HEADER*/
  button{
    border-radius:5px;
    padding:10px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', sans-serif;
    color:white;
    font-weight: bold;
  }
  .auth-menu button{
    background-color:#3D550C;
    border-radius:5px;
    padding:5px;
    border-width: 1px;
    font-weight: bold;
    border-width: 1.5px;
    margin-right:5px;
  }

  .auth-menu button:hover{
    border: 2px solid white;
  }

  .crops-menu button{
    background-image: linear-gradient(#81B622,#59981A);
    border-radius: 5px;
    padding:10px;
    margin-right: 10px;
    border-style:none;
  }

  .crops-menu button:hover{
    text-decoration: underline;
  }

/*MAIN CONTAINER*/
  .main-component{
    height: 80vh;
    width: 100vw;
    margin: 0%;
    padding: 0%;
    align-content: center;
  }

  .custom-shape-main-component {
    fill:#59981A;
    position: absolute;
    top: 10vh;
    left: 0;
    width: 100%;
    height: 80%;
    overflow: hidden;
    line-height: 0;
    background-color:#81B622;
    z-index: -1;
}
/*    FOOTER    */
.footer{
  margin: 0;
  padding: 0;
  display: flex;
  position: absolute;
  width: 100vw;
  bottom:0px;
  height:10vh;
  color:inherit;
  font-family: inherit;
  font-size: 1rem;
  background-color: #59981A;
  justify-content: center;
  align-items: center;
}
</style>