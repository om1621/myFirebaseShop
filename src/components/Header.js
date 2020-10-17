import React, {useState} from 'react';
import { Container, Navbar, Nav , Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Redirect} from 'react-router-dom';
import fb from '../firebase';

const Header = () => {

    const [render , setRender] = useState(false);

    // Log out the current signed-in user
    const logout = (e) => {
        e.preventDefault();

        fb.auth().signOut();

        setRender(true);
    }

    // Redirect to login component when successfully logged out
    const renderRedirect = () => {
        if(render){
            return <Redirect to="/login" />
        }
    }

    return (
        <>
            {renderRedirect()}
            <Navbar bg="light" expand="lg" className="p-3"> 
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>MyOnlineStore</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart" >
                                <Nav.Link> <i className="fa fa-shopping-cart"></i> cart</Nav.Link>
                            </LinkContainer>
                            <Button variant="warning mx-3" onClick={logout}> Log out </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container> 
            </Navbar>
        </>
    )
}

export default Header;
