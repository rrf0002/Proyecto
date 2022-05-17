import './Foro.css';
import imagen_perfil from './Imagenes/avatar-1-48.png'
import React from 'react';



function Perfil(props){
  localStorage.setItem("tipo",props.id);

  if(Boolean(localStorage.getItem("usuario"))==false){
    return(
      <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
        <li><a className="dropdown-item" href="/login">Iniciar sesión</a></li>
      </ul>
    )
  }
  else{
    if(props.id=="cliente"){
      return(
        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
          <li><a className="dropdown-item" href="#">Mi perfil</a></li>
          <li><a className="dropdown-item" id='cerrar_sesion'>Cerrar sesión</a></li>    
        </ul>
      )
    }
    if(props.id=="admin"){
      return(
        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
          <li><a className="dropdown-item" id='anadir_admin'>Añadir administrador</a></li>
          <li><a className="dropdown-item" id='cerrar_sesion'>Cerrar sesión</a></li>    
        </ul>
      )
    }
  }
}

function Boton(props){
  if(props.id=="cliente"){
    return(
      <button type="button" className="btn btn-outline-secondary" id="crear_post">Crear Post</button>
    )
  }  
}

class Foro extends React.Component {

  constructor(props){
      super(props);
      this.state={value:"", articulo:[], categoria:[],datos_usuario:[],tipo:"" };
      this.noticia=this.recoger_articulo.bind(this);
      this.todas_categorias=this.recoger_categorias.bind(this);
      this.filtrar_categoria=this.filtrado_categorias.bind(this);
      this.coger_id=this.pasar_pagina.bind(this);
      this.crear_post=this.ir_crear_post.bind(this);
      this.anadir_admin=this.ir_anadir_admin.bind(this);
      this.coger_usuario=this.coger_datos_usuario.bind(this);
      this.funcion=this.añadir_funcion.bind(this);
      this.f=this.funciones.bind(this);
      this.borrar=this.borrar_publicacion.bind(this);
      this.openNav = this.openNav.bind(this);
      this.closeNav = this.closeNav.bind(this);
      this.fileInput = React.createRef();

  }

  openNav() {
      document.getElementById("mySidemenu").style.width = "250px";
      document.getElementById("btn").style.height = "0px";
      document.getElementById("main").style.marginLeft = "250px";
      document.getElementById("btn_dentro").style.opacity = 0;
      document.getElementById("btn_dentro").style.display = "none";
  }
  menu() {

      if (document.getElementById("dashboard-nav-dropdown-menu").style.display == "block") {
          document.getElementById("dashboard-nav-dropdown-menu").style.display = "none";

      }
      else {
          document.getElementById("dashboard-nav-dropdown-menu").style.display = "block";

      }
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  closeNav() {
      document.getElementById("mySidemenu").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      document.getElementById("btn").style.height = "50px";
      document.getElementById("btn_dentro").style.display = "block";
      setTimeout(function () {

          document.getElementById("btn_dentro").style.opacity = 1;
      }, 300);
  }

  pasar_pagina({currentTarget}) { 
    localStorage.setItem('id_articulo',currentTarget.id);
    window.location.href="/pagina_articulo";
  }

  ir_crear_post(){
    window.location.href="/crear_post";
  }

  ir_anadir_admin(){
    window.location.href="/anadir_admin";
  }

  coger_datos_usuario(){
    var datos= new FormData();
    if(Boolean(localStorage.getItem("usuario"))==true){
      datos.append("usuario",localStorage.getItem("usuario"));
    }
    else{
      datos.append("usuario","");
    }
    
    fetch("http://localhost/php_insti/consultar_usuario.php",{
        method : "POST",
        body: datos
    })
    .then(res=>res.json())
        .then(
          (result)=>{
            if(result=='vacio'){
              this.setState({datos_usuario:["Nada"]});
            }
            else{
              this.setState({datos_usuario:result});
            }
          },
          (error)=>{
            console.log(error);
          }
        )
  }

  filtrado_categorias({currentTarget}){
    var datos=new FormData();
    datos.append('nombre_categoria',currentTarget.id);
    fetch("http://localhost/php_insti/filtrar_categorias.php",{
        method:"POST",
        body:datos
    })
    .then(res=>res.json())
    .then(
        (result)=>{
          this.setState({
            articulo : result
          });
          document.getElementById('limpiar_categorias').style.display="block";
        },
        (error)=>{
            console.log(error);
        }
    )
  }

  recoger_categorias(){
    var datos=new FormData();
    fetch("http://localhost/php_insti/recoger_categorias.php",{
        method:"POST",
        body:datos
    })
    .then(res=>res.json())
    .then(
        (result)=>{
          this.setState({
            categoria : result
          });
        },
        (error)=>{
            console.log(error);
        }
    )
  }

  recoger_articulo(){
      var datos=new FormData();
      fetch("http://localhost/php_insti/recoger_informacion.php",{
          method:"POST",
          body:datos
      })
      .then(res=>res.json())
      .then(
          (result)=>{
            
            this.setState({
              articulo : result
            });
            document.getElementById('limpiar_categorias').style.display="none";
          },
          (error)=>{
              console.log(error);
          }
      )
  }

  borrar_publicacion({currentTarget}){
    var datos=new FormData();
    datos.append('id_publicacion',currentTarget.id);
      fetch("http://localhost/php_insti/borrar_publicacion.php",{
          method:"POST",
          body:datos
      })
      .then(res=>res.json())
      .then(
          (result)=>{
            if(result=="Correcto"){
              this.noticia();
              this.todas_categorias();
            }
            
          },
          (error)=>{
              console.log(error);
          }
      )
  }

  funciones(){
    localStorage.setItem("usuario","");
    window.location.reload()
  }

  añadir_funcion(){
    if(localStorage.getItem("usuario")!=""){
      var elemento_cerrar=document.getElementById("cerrar_sesion");
      elemento_cerrar.onclick=this.f;
      
      if(localStorage.getItem("tipo")=="admin"){
        var elemento_admin=document.getElementById("anadir_admin");
        elemento_admin.onclick=this.anadir_admin;

      }
      if(localStorage.getItem("tipo")=="cliente"){
        var elemento_crear=document.getElementById("crear_post");
        elemento_crear.onclick=this.crear_post;
      }
    }
  }

  componentDidMount(){
    this.todas_categorias();
    this.coger_usuario();
    this.noticia();
  }


  render(){
    var admin = false;
    if(localStorage.getItem("tipo")=="admin"){
      admin = true;
    }
    
    return (
      <div class='dashboard'>
                <div id="mySidemenu" class="sidemenu">
                    <a href="javascript:void(0)" class="cerrar" onClick={this.closeNav}>&times;</a>
                    <a href="#" >Home</a>
                    <a href="#" onClick={this.menu}>Registrations</a>
                    <div id="dashboard-nav-dropdown-menu" class='dashboard-nav-dropdown-menu' style={{ display: "none" }}>
                        {this.state.categoria.map((nombre) => <a className="dashboard-nav-dropdown-item" id={nombre.Categoria} key={nombre.Categoria} onClick={this.filtrar_categoria}>{nombre.Categoria}</a>)}

                    </div>

                    <a href="#">Reports</a>
                    <a
                        href="#" class="dashboard-nav-item" ><i class="fas fa-sign-out-alt"></i> Logout </a>

                </div>
                <div id="main">
                    <div class="btnclas" id="btn">

                        <button class="btn-open" id="btn_dentro" onClick={this.openNav}>&#9776;</button>
                    </div>

                    <div class='dashboard-app'>
                        <header class='dashboard-toolbar'><a href="#!" class="menu-toggle"><i class="fas fa-bars"></i></a></header>
                        <div class='dashboard-content'>
                            <div class='container'>
                                <div class='card'>
                                    <div class='card-header'>
                                        <h1>Foro</h1>
                                        <button type="button" onClick={this.crear_post} className="btn btn-outline-secondary">Crear Post</button>
                                        
                                    </div>
                                    <div class='card-body'>

                                        {this.state.articulo.map((partes) => <article id={partes.ID_articulo} key={partes.ID_articulo} onClick={this.coger_id}><div class="card border-success  m-4"><div class="card-body"><h5 class="card-title ">{partes.Titulo}</h5><p class="card-text">{partes.Cuerpo}</p></div></div></article>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}

export default Foro;