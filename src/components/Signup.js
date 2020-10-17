import React , {useState} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Redirect} from 'react-router-dom'
import fb from '../firebase';

const Signup = () => {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [render , setRender] = useState(false);


    const handleChange = (e) => {
        e.preventDefault();

        const val = e.target.value;

        switch(e.target.name){
            case'name': 
                setUserName(val);
                break;

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

        const user = {
            name: userName,
            email: userEmail,
            cart: []
        }

        fb.auth().createUserWithEmailAndPassword(userEmail, userPassword)
        .then((res) => {
            setRender(true);
            
            // adding user to the database
            const db = fb.firestore();

            db.collection('users').doc(user.email).set(user)
            .then((res) => {
                console.log("suceesfully added new user");
            })
            .catch((error) => {
                alert(error);
            });

        })
        .catch((error) => {
            alert(error);
        });



    };

    // Redirect to Homepage component when successfully signed-in
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
                        <h1 className="text-center my-3"> SIGN UP</h1>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={handleChange} name="name" value={userName} />
                        </Form.Group>

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

                        <LinkContainer to="/login">
                            <Button variant="success mx-3">
                                Sign In
                            </Button>
                        </LinkContainer>
                    </Form>
                </div>
               
            </Container>
        </>
    )
}

export default Signup;