import {useState} from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = ({setUsuarioLogueado}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargandoUsuario, setCargandoUsuario] = useState(false);
  const URL = process.env.REACT_APP_API_CAFETERIA_USUARIO
  const navigate = useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault();
    //valiar que el email y password son correctos
    try{
      const respuesta = await fetch(URL,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      if(respuesta.status === 200){
        const data = await respuesta.json();
        // console.log(data)
        //almaceno el usuario en el state y localstorage
        localStorage.setItem('tokenCafe', JSON.stringify(data))
        setUsuarioLogueado(data)
        //redireccionar al home
        navigate('/')
      }

    }catch(error){
      console.log(error)
      alert('no se pudo loguear')
    }
  };

  
  return (
    <Container className="mainSection">
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
