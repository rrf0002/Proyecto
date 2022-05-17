import './App.css';
import imagen_perfil from './Imagenes/avatar-1-48.png';
import ReactDOM from 'react-dom';
import editar from './Imagenes/editar.png';
import React from 'react';
function Perfil(props) {
    localStorage.setItem("tipo", props.id);

    if (Boolean(localStorage.getItem("usuario")) == false) {
        return (
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
                <li><a className="dropdown-item" href="/login">Iniciar sesión</a></li>
            </ul>
        )
    }
    else {
        if (props.id == "cliente") {
            return (
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
                    <li><a className="dropdown-item" href="#">Mi perfil</a></li>
                    <li><a className="dropdown-item" id='cerrar_sesion'>Cerrar sesión</a></li>
                </ul>
            )
        }
        if (props.id == "admin") {
            return (
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
                    <li><a className="dropdown-item" id='anadir_admin'>Añadir administrador</a></li>
                    <li><a className="dropdown-item" id='cerrar_sesion'>Cerrar sesión</a></li>
                </ul>
            )
        }
    }
}

function Editar_nombre_perfil() {
    if (localStorage.getItem("nombre_usuario") == localStorage.getItem("usuario")) {
        return (        
            <img src={editar} id="editar_nombre" className="foto_editar"></img>
        )
    }
}
var seleccionado;
class Foro extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: "", articulo: [], categoria: [], imagen_prueba: '', datos_usuario: [], tipo: "",cantidad_del_post: [] };
        this.noticia = this.recoger_articulo.bind(this);
        this.todas_categorias = this.recoger_categorias.bind(this);
        this.filtrar_categoria = this.filtrado_categorias.bind(this);
        this.coger_id = this.pasar_pagina.bind(this);
        this.crear_post = this.ir_crear_post.bind(this);
        this.imagen = this.añadir_imagen.bind(this);
        this.insertar = this.insertar.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.anadir_admin = this.ir_anadir_admin.bind(this);
        this.coger_usuario = this.coger_datos_usuario.bind(this);
        // this.funcion = this.añadir_funcion.bind(this);
        // this.f = this.funciones.bind(this);
        // this.borrar = this.borrar_publicacion.bind(this);
        this.preview = this.preview_perfil.bind(this);
        this.perfil = this.perfil_usuario.bind(this);
        this.cantidad_post = this.cantidad_post_usuario.bind(this);
        this.publicaciones=this.publicaciones_usuario.bind(this);
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


    pasar_pagina({ currentTarget }) {
        localStorage.setItem('id_articulo', currentTarget.id);
        window.location.href = "/pagina_articulo";
    }

    ir_crear_post() {
        window.location.href = "/crear_post";
    }
    ir_anadir_admin() {
        window.location.href = "/anadir_admin";
    }
    coger_datos_usuario() {
        var datos = new FormData();
        if (Boolean(localStorage.getItem("usuario")) == true) {
            datos.append("usuario", localStorage.getItem("usuario"));
        }
        else {
            datos.append("usuario", "");
        }

        fetch("http://localhost/php_insti/consultar_usuario.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result == 'vacio') {
                        this.setState({ datos_usuario: ["Nada"] });
                    }
                    else {
                        this.setState({ datos_usuario: result });
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    filtrado_categorias({ currentTarget }) {

        console.log(seleccionado);
        if (seleccionado == currentTarget.id) {
            this.noticia();
            document.getElementById(seleccionado).style.backgroundColor = '#1A565D';
            document.getElementById(seleccionado).style.color = '#9eadae';

        } else {
            document.getElementById(currentTarget.id).style.backgroundColor = '#f1f1f121';
            document.getElementById(currentTarget.id).style.color = '#f1f1f1';
            if (seleccionado != null) {
                document.getElementById(seleccionado).style.backgroundColor = '#1A565D';
                document.getElementById(seleccionado).style.color = '#9eadae';
            }

            seleccionado = currentTarget.id;

            var datos = new FormData();
            datos.append('nombre_categoria', currentTarget.id);

            fetch("http://localhost/php_insti/filtrar_categorias.php", {
                method: "POST",
                body: datos
            })
                .then(res => res.json())
                .then(
                    (result) => {

                        this.setState({
                            articulo: result
                        });
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
    }
    publicaciones_usuario(){
        var datos = new FormData();
        datos.append('creador',localStorage.getItem("Creador") );
        fetch("http://localhost/php_insti/publicacion_usuario.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {


                    this.setState({
                        cantidad_del_post: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    
    cantidad_post_usuario(){
        var datos = new FormData();
        
        datos.append('nombre_categoria',localStorage.getItem("Creador") );
        fetch("http://localhost/php_insti/cantidad_post.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        cantidad_del_post: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    recoger_categorias() {
        var datos = new FormData();
        datos.append('nombre_categoria',localStorage.getItem("Creador") );
        fetch("http://localhost/php_insti/publicacion_usuario.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        articulo: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    recoger_articulo() {
        var datos = new FormData();
        fetch("http://localhost/php_insti/recoger_informacion.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {


                    this.setState({
                        articulo: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    // borrar_publicacion({ currentTarget }) {
    //     var datos = new FormData();
    //     datos.append('id_publicacion', currentTarget.id);
    //     fetch("http://localhost/php_insti/borrar_publicacion.php", {
    //         method: "POST",
    //         body: datos
    //     })
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 if (result == "Correcto") {
    //                     this.noticia();
    //                     this.todas_categorias();
    //                 }

    //             },
    //             (error) => {
    //                 console.log(error);
    //             }
    //         )
    // }

    // funciones() {
    //     localStorage.setItem("usuario", "");
    //     window.location.reload()
    // }

    // añadir_funcion() {
    //     if (localStorage.getItem("usuario") != "") {
    //         var elemento_cerrar = document.getElementById("cerrar_sesion");
    //         elemento_cerrar.onclick = this.f;

    //         if (localStorage.getItem("tipo") == "admin") {
    //             var elemento_admin = document.getElementById("anadir_admin");
    //             elemento_admin.onclick = this.anadir_admin;

    //         }
    //         if (localStorage.getItem("tipo") == "cliente") {
    //             var elemento_crear = document.getElementById("crear_post");
    //             elemento_crear.onclick = this.crear_post;
    //         }
    //     }
    // }
    componentDidMount() {
        this.cantidad_post();
        this.coger_usuario();
        this.todas_categorias();
        this.coger_usuario();
        
    }
    insertar() {

        var datos = new FormData;
        datos.append('archivo', this.fileInput.current.files[0])

        fetch("http://localhost/Probar_codigo/Probarsubirimg.php", {
            method: 'POST',
            body: datos
        })
            .then(
                res =>
                    res.json()

            )
            .then(
                (result) => {
                    this.setState({ imagen_prueba: result });
                    this.imagen()
                }
            )



    }
    añadir_imagen() {
        const cargarImagen = require.context("./upload", true);

        var elemento_padre = document.getElementById("tt").parentNode;
        var elemento_nuevo = document.createElement("img");
        elemento_nuevo.setAttribute("src", cargarImagen('./' + this.state.imagen_prueba));

        elemento_padre.appendChild(elemento_nuevo);
    }
    preview_perfil() {
        var elemento_antiguo = document.getElementById("preview");

        var elemento_padre = elemento_antiguo.parentNode;

        var elemento_nuevo = document.createElement("div");
        var escribir = document.createElement("textarea");
        escribir.setAttribute("className", "preview_perfil");
        escribir.setAttribute("rows", "4");
        elemento_nuevo.appendChild(escribir);

        elemento_padre.replaceChild(elemento_nuevo, elemento_antiguo);

    }
    perfil_usuario() {
        window.location.href = "/Perfil";
    }
    render() {
        var mismousuario = false;
        if (localStorage.getItem("nombre_usuario") == localStorage.getItem("usuario")) {
            mismousuario = true;
        }
        return (
            <div className='dashboard' onMouseEnter={this.funcion}>
                <div id="mySidemenu" className="sidemenu">
                    <a href="javascript:void(0)" className="cerrar" onClick={this.closeNav}>&times;</a>
                    <img src={imagen_perfil} className="dropdown-toggle" data-bs-toggle="dropdown" ></img>
                    {this.state.datos_usuario.map((usuario) => <Perfil id={usuario.Tipo} />)}
                    <a href="/app" >Home</a>
                    <a href="#" onClick={this.menu}>Registrations</a>
                    <div id="dashboard-nav-dropdown-menu" className='dashboard-nav-dropdown-menu' style={{ display: "none" }}>
                        {this.state.categoria.map((nombre) => <a className="dashboard-nav-dropdown-item" id={nombre.Categoria} key={nombre.Categoria} onClick={this.filtrar_categoria}>{nombre.Categoria}</a>)}

                    </div>

                    <a href="#">Reports</a>
                    <a
                        href="#" className="dashboard-nav-item" ><i className="fas fa-sign-out-alt"></i> Logout </a>

                </div>
                <div id="main">
                    <div className="btnclas" id="btn">

                        <button className="btn-open" id="btn_dentro" onClick={this.openNav}>&#9776;</button>
                    </div>

                    <div className='dashboard-app'>
                        <header className='dashboard-toolbar'><a href="#!" className="menu-toggle"></a></header>

                        <div className='dashboard-content'>
                            <div className='container'>

                                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12 text-center ">
                                            <div className="panel panel-default">
                                                <div className="userprofile social ">
                                                    <div className="userpic"> <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" className="userpicimg" /> </div>
                                                    <h3 className="username">{localStorage.getItem("Creador")} <Editar_nombre_perfil /></h3>
                                                    <p>Gujarat, India <Editar_nombre_perfil /></p>
                                                    <div className="socials tex-center"> <a href="" className="btn btn-circle btn-primary ">
                                                        <i className="fa fa-facebook"></i></a> <a href="" className="btn btn-circle btn-danger ">
                                                            <i className="fa fa-google-plus"></i></a> <a href="" className="btn btn-circle btn-info ">
                                                            <i className="fa fa-twitter"></i></a> <a href="" className="btn btn-circle btn-warning "><i className="fa fa-envelope"></i></a>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 border-top border-bottom">
                                                    <ul className="nav nav-pills pull-left countlist" role="tablist">
                                                        <li role="presentation">
                                                            <h3>1452<br />
                                                                <small>Follower</small> </h3>
                                                        </li>
                                                        <li role="presentation">
                                                            <h3>245<br />
                                                                <small>Following</small> </h3>
                                                        </li>
                                                        <li role="presentation">
                                                            <h3>{this.state.cantidad_del_post.map((partes) => <div>{partes[0]}</div>)}<br />
                                                            
                                                                <small>Activity</small> </h3>
                                                        </li>
                                                    </ul>

                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div classNameName='botones'>

                                        <button className="btn btn-primary followbtn" onClick={this.todas_categorias}>Follow</button>
                                        <button className="btn btn-primary followbtn">Follow</button>
                                        <button className="btn btn-primary followbtn">Follow</button>
                                    </div>
                                    {this.state.articulo.map((partes) => <article id={partes.ID_articulo} key={partes.ID_articulo} ><div className="card border-success  m-4"><div className="card-body"><h5 className="card-title " id={partes.ID_articulo} key={partes.ID_articulo} onClick={this.coger_id}>{partes.Titulo}{partes.User}</h5><p id={partes.Creador}onClick={this.perfil}>Creado por:{partes.Creador}</p><p className="card-text">{partes.Cuerpo}</p></div></div></article>)}
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