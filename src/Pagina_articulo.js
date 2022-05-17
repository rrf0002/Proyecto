import './Pagina_articulo.css';
import React from 'react';

class Articulo extends React.Component {

    constructor(props){
        super(props);
        this.state={value:"", noticia:[]}
        this.noticia=this.recoger_articulo.bind(this);
    }

    componentDidMount(){
        this.noticia();
    }

    recoger_articulo(){
        var datos=new FormData();
        datos.append('id',localStorage.getItem('id_articulo'));
        fetch("http://localhost/php_insti/recoger_articulo.php",{
            method:"POST",
            body:datos
        })
        .then(res=>res.json())
        .then(
            (result)=>{
              this.setState({
                noticia : result
              });
            },
            (error)=>{
                console.log(error);
            }
        )
    }


        
    render(){
        return (
            <div id='todo'>
                {this.state.noticia.map((partes)=><div id='articulo'><h2>{partes.Titulo}</h2><p>{partes.Cuerpo}</p></div>)}
            </div>
        
        );
    }
}

  
  


export default Articulo;
