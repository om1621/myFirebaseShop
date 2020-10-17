import React, {useState, useEffect} from 'react'
import * as firebase from 'firebase'
import Header from './Header'
import Footer from './Footer'
import { Container, Button, Row, Col, ListGroup } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import fb from '../firebase'

const Productscreen = ({match}) => {

    const [product, setProduct] = useState([]);

    useEffect(() => {

        const db = fb.firestore();
        
        db.collection('products').doc(match.params.id).get()
        .then((document) => {
            const data = document.data();
            setProduct(data);
        });
       
     }, [match]);

     const addToCart = (e) => {
        
        e.preventDefault();
        const db = fb.firestore();

        db.collection('users').doc(match.params.uid).update({
            cart: firebase.firestore.FieldValue.arrayUnion(product)
        })
        .then((res) => {
            alert("successfully added to cart ;)");
        })
        .catch((error) => {
            console.log(error);
        })        
    }



    return (
        <>
            <Header /> 
            <div className="product-screen">
                <Container className="my-3 py-3">
                    <LinkContainer to="/">
                        <Button variant="secondary" >
                                Go Back
                        </Button>
                    </LinkContainer>

                    <Row className="my-3 py-3">
                        <Col md={6} className="text-center">
                            <img src={product.image} alt={product.name} style={{minHeight: "60vh"}} />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>{product.name}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h6>Price: {product.price}</h6>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h6>Rating: {product.rating} | {product.numReviews} user reviews </h6>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h6>{product.description}</h6>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h6>Price: {product.price}</h6>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h6> { product.countInStock > 0 ? `In Stock: ${product.countInStock}` : "Out of Stock"} </h6>
                                </ListGroup.Item>
                                <ListGroup.Item className="text-center">
                                    <Button variant="primary" disabled={product.countInStock === 0} onClick={addToCart} > Add To Cart </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                       
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Productscreen
