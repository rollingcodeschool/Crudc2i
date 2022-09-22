import {useState} from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = ({setUsuarioLogueado}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargandoUsuario, setCargandoUsuario] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("desde el form");
  };

  
  return (
    <Container>
      <Card className="my-5">
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese un email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="mb-3">
              <Link to={"/registro"}>Crear una cuenta</Link>
            </div>
            <Button variant="primary" type="submit">
              Iniciar
            </Button>
          </Form>
        </Card.Body>
        {cargandoUsuario ? (
          <Alert variant="danger" className="mx-3">
            Usuario o contraseña erroneo
          </Alert>
        ) : null}
      </Card>
    </Container>
  );
};

export default Login;
