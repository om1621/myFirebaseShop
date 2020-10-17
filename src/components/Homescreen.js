import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Product from "./Product"
import fb from '../firebase'

const Homescreen = ({uid}) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

       const db = fb.firestore();

       db.collection("products").get()
       .then(querySnapshot => {
           const data = querySnapshot.docs.map(doc => doc.data());
           setProducts(data);
         });
    }, []);

    return (
        <div className="home-screen">
            <Container className="py-3 my-3" >
                <h2>LATEST PRODUCTS</h2>

                <Row>
                    { products.map((product) => (
                        <Col key={product.uid} sm={12} md={6} lg={4} className="my-3" >
                            <Product product={product} uid={uid}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Homescreen;
