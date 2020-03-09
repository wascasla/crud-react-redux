import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//crear nuevos productos
export function crearNuevoProductoAction(producto) {
    //el dispatch ejecuta otras funciones
    return async (dispatch) => {
        dispatch( agregarProducto() );

        //consulta a la base de datos
        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto);

            //si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto));

            //alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch( agregarProductoError(true));

            //alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }

    
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,  //este llama al action de productoReducer
    payload: true
});

//si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto

});// lo que esta en el parentesis es el action

//si hubo un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

//Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargaProductosExitosa(respuesta.data) );
        } catch (error) {
            console.log();
            dispatch( descargaProductosError(true) );  
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = (estado) => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: estado
});

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete((`/productos/${id}`));
            dispatch( eliminarProductoExito());

            // si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'Se elimino correctamente.',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
            
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});