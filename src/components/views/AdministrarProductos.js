import React from "react";
import { Table, Button } from "react-bootstrap";
import ItemProducto from "./ItemProducto";

const AdministrarProductos = () => {
  return (
    <section className="container">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Productos disponibles</h1>
        <Button variant="primary">Agregar</Button>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Cod</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>URL de Imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {/* aqui tengo que hacer un map */}
          <ItemProducto></ItemProducto>
        </tbody>
      </Table>
    </section>
  );
};

export default AdministrarProductos;
