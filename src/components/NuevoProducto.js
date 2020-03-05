import React, { useState} from 'react';
import { useDispatch, useSelector} from 'react-redux'; 

//actions de redux
import {crearNuevoProductoAction} from '../actions/productoActions';

const NuevoProducto = () => {

    //state del componente
    const [nombre, guardarNombre ] = useState('');
    const [precio, guardarPrecio ] = useState(0);

    //utilizar use dispath y te crea una funcion
    const dispath = useDispatch();

    // esta funcion debe llamar al action de redux mediante un import de redux
    //manda llamar el action de productoAction
    const agregarProducto = (producto) => dispath(crearNuevoProductoAction(producto));

    // cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        //validar formulario
        if(nombre.trim === '' || precio <= 0){
            return;
        }

        //si no hay errores

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });
        
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo producto
                        </h2>

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

                    </div>
                </div>
            </div>
        </div>

     );
}
 
export default NuevoProducto;