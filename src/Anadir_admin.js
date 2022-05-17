import React from 'react';
import './Anadir_admin.css';

class Anadir_admin extends React.Component{
  constructor(props){
    super(props);
    this.state={value:"", usuario:"", contra:"",error:"",aux:"" }

    this.contrasena=this.c.bind(this);
    this.user=this.u.bind(this);
    this.registra=this.registrar.bind(this);
  }

  registrar(){//Añade un usuario en la base de datos
    var datos= new FormData();
    datos.append('usuario', this.state.usuario);
      datos.append('contra', this.state.contra);
    fetch("http://localhost/php_insti/anadir_admin.php",{
        method : "POST",
        body: datos
    })
    .then(res=>res.json())
        .then(
            (result)=>{
              
                if(result!="Disponible"){
                  this.setState({error:"El usuario no esta disponible"});
                }
                this.setState({contra:""});
                if(result=="Disponible"){
                    window.location.href="/foro";
                }
            },
            (error)=>{
                console.log(error);
            }
        )
  }

  u(event){//Para modificar el usuario
    this.setState({usuario:event.target.value});
    console.log(this.state.usuario_inicio);
  }

  c(event){//Para modificar la contraseña contra
    this.setState({contra:event.target.value});
    console.log(this.state.contra_inicio);
  }

  

  render(){
    return (
      <div className="App" >
            <div id='inicio_sesion'>
              <div className="col-md-4">
                <div className="card card-body">
                  <div className="form-group">
                    <input type="text" value={this.state.usuario} onChange={this.user} name="usuario" className="form-control" placeholder="Escriba su usuario" autoFocus required/>
                  </div>
                  <br/>
                  <div className="form-group">
                    <input type="password" value={this.state.contra} name="contra" onChange={this.contrasena} className="form-control" placeholder="Escriba su contraseña" required />
                  </div>
                  <br/>
                  <p className="text-danger">{this.state.error}</p>
                  <div className="btn-group " role="group" aria-label="Basic outlined button group">
                    <button onClick={this.registra} type="button" className="btn btn-outline-success">Registrar administrador</button>                  
                  </div>
                </div>
              </div>  
          </div>
      </div>
    );
  }
}

export default Anadir_admin;