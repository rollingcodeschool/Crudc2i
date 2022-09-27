import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { cantidadCaracteres, validarPrecio } from "./helpers";
import Swal from "sweetalert2";

const EditarProducto = () => {
  //traer el parametro
  const { id } = useParams();
  // console.log(id);

  const [producto, setProducto] = useState({});
  const URL = process.env.REACT_APP_API_CAFETERIA;
  //referencias
  const nombreProductoRef = useRef("");
  const precioRef = useRef(0);
  const imagenRef = useRef("")
  //navigate
  const navegacion = useNavigate();

  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    try {
      const respuesta = await fetch(URL + "/" + id); //`${URL}/${id}`
      const dato = await respuesta.json();
      setProducto(dato);
    } catch (error) {
      console.log(error);
      //mostrar un mensaje al usuario
    }
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    //validar que todos los campos son correctos
    // console.log(nombreProductoRef)
    // console.log(nombreProductoRef.current)
    // console.log(nombreProductoRef.current.value)
    if(cantidadCaracteres(nombreProductoRef.current.value) && validarPrecio(precioRef.current.value)){
        //crear un objeto con los datos modificados
        const productoEditar = {
            nombreProducto: nombreProductoRef.current.value,
            imagen: imagenRef.current.value,
            precio: precioRef.current.value,
            categoria: producto.categoria
        }
        console.log(productoEditar);
        //pedir a la api la actualizacion
        try{
            const resp = await fetch(`${URL}/${id}`,{
                method: "PUT",
                headers:{
                    "Content-Type":"application/json",
                    "x-token": JSON.parse(localStorage.getItem('tokenCafe')).token
                },
                body: JSON.stringify(productoEditar)
            })
            if(resp.status === 200){
                Swal.fire(
                    'Producto modificado',
                    'El producto fue modificado correctamente',
                    'success'
                  );
                  //redirecciono a la pagina de administrar productos
                navegacion('/administrar')  
            }

        }catch(error){
            console.log(error)
            //mostrar un mensaje al usuario
        }
        //redireccionar a la web de la tabla de productos
    }else{
        //mostrar un mensaje de error de validacion de datos al usuario
    }
  }

  return (
    <section className="container">
      <h1 className="display-4 mt-5">Editar producto</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
          <Form.Label>Nombre producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            defaultValue={producto.nombreProducto}
            ref={nombreProductoRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            defaultValue={producto.precio}
            ref={precioRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/foto/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            defaultValue={producto.imagen}
            ref={imagenRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select
            value={producto.categoria}
            onChange={(e) =>
              setProducto({ ...producto, categoria: e.target.value })
            }
          >
            <option value="">Seleccione una opcion</option>
            <option value="bebida-caliente">Bebida caliente</option>
            <option value="bebida-fria">Bebida fria</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
      {/* {msjError ? (
        <Alert variant="danger" className="mt-4">
          Debe corregir los datos
        </Alert>
      ) : null} */}
    </section>
  );
};

export default EditarProducto;
