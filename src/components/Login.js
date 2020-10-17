import React , {useState} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Redirect} from 'react-router-dom'
import fb from '../firebase'

const Login = () => {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [render , setRender] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();

        const val = e.target.value;

        switch(e.target.name){

            case 'email': 
                setUserEmail(val);
                break;

            case 'password': 
                setUserPassword(val);
                break;

            default: {
                break;
            }
        }
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fb.auth().signInWithEmailAndPassword(userEmail, userPassword)
        .then((res) => {
            setRender(true);
        })
        .catch((err) => {
            alert(err);
        })

    };

    // Redirect to Homepage component when successfully logged out
    const renderRedirect = () => {
        if(render){
            return <Redirect to="/" />
        }
    };

    return (
        <>
            {renderRedirect()}
            <Container>
                <div className="form-div" style={{display: 'flex', justifyContent:"center", alignItems:"center", minHeight: '100vh'}}>
                    <Form style={{width: '100%', maxWidth:"540px"}} className="shadow p-3 rounded" onSubmit={handleSubmit} >
                        <h1 className="text-center my-3"> SIGN IN </h1>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleChange} name="email" value={userEmail}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password" value={userPassword} />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>

                        <LinkContainer to="/">
                            <Button variant="success mx-3">
                                Sign up
                            </Button>
                        </LinkContainer>
                    </Form>
                </div>
               
            </Container>
        </>
    )
}

export default Login;