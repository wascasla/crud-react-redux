import React, { useState } from 'react'; 
import { useDispatch, useSelector} from 'react-redux'; 

//useSelector es el hook que nos da react redux para leer lo que tengamos en el state

//actions de redux
import {crearNuevoProductoAction} from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

    //state del componente
    const [nombre, guardarNombre ] = useState('');
    const [precio, guardarPrecio ] = useState(0);

    //utilizar use dispath y te crea una funcion
    const dispath = useDispatch();

    // acceder al state del store
    const cargando = useSelector( state => state.productos.loading);
    const error = useSelector(state => state.productos.error );
    const alerta = useSelector(state => state.alerta.alerta);

    // esta funcion debe llamar al action de redux mediante un import de redux
    //manda llamar el action de productoAction
    const agregarProducto = (producto) => dispath(crearNuevoProductoAction(producto));

    // cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        //validar formulario
        if(nombre.trim === '' || precio <= 0){

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger texte-center text-uppercase p3'
            }
            dispath(mostrarAlerta(alerta)); //para ejecutar las acciones del action
                                            //se usa dispatch

            return;
        }

        //si no hay errores
        dispath(ocultarAlertaAction());

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        
            //redireccionar
            history.push('/');
        
        
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo producto
                        </h2>

                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                                >
                                Agregar
                            </button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null }
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}

                    </div>
                </div>
            </div>
        </div>

     );
}
 
export default NuevoProducto;