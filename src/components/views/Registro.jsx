import { useState } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Registro = ({setUsuarioLogueado}) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const URL = process.env.REACT_APP_API_CAFETERIA_USUARIO;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //tengo que validar los datos
    try {
      const respuesta = await fetch(URL + "/nuevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
        }),
      });

      if (respuesta.status === 201) {
        // console.log(respuesta.json());
        const data = await respuesta.json();
        // console.log(data)
        //almaceno el usuario en el state y localstorage
        localStorage.setItem("tokenCafe", JSON.stringify(data));
        setUsuarioLogueado(data);
        //redireccionar al home
        navigate("/");
      } else {
        alert("error al crear un usuario");
      }
    } catch (error) {
      console.log(error);
      //mostrar un mensaje de error al usuario
    }
  };

  return (
    <Container className="mainSection">
      <Card className="my-5">
        <Card.Header as="h5">Crear cuenta</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNombreApellido">
              <Form.Label>Nombre y Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Juan Perez"
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="juanperez@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Registro;
