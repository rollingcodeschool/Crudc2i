import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ItemProducto = ({producto, consultarAPI}) => {
    const {nombreProducto, id, categoria, imagen, precio} = {...producto}
    const URL = process.env.REACT_APP_API_CAFETERIA

    const handleDelete = ()=>{
        Swal.fire({
            title: '¿Esta seguro de borrar este producto?',
            text: "No puede volver este paso atras",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
          }).then( async(result) => {
            if (result.isConfirmed) {
                //realizar la peticion para eliminar un producto DELETE
                try{
                    const parametros = {
                        method: "DELETE"
                    }
                    const respuesta = await fetch(URL+'/'+id, parametros);
                    if(respuesta.status === 200){
                        Swal.fire(
                            'Producto eliminado',
                            'Su producto fue correctamente eliminado',
                            'success'
                        )
                        //recargar la tabla de productos
                        consultarAPI();
                    }
                }catch(error){
                    console.log(error)
                    //mostrar un mensaje de error al usuario
                }  
            }
          })
    }

    return (
        <tr>
            <td>{id}</td>
            {/* <td>{props.producto.nombreProducto}</td> */}
            <td>{nombreProducto}</td>
            <td>${precio}</td>
            <td>{imagen}</td>
            <td>{categoria}</td>
            <td>
                <Link to={`/administrar/editar/${id}`} className='btn btn-warning'>Editar</Link>
                <Button variant='danger' onClick={handleDelete}>Borrar</Button>
            </td>
          </tr>
    );
};

export default ItemProducto;