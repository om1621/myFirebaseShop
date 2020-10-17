import React, {useState, useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import { Container, Row, Col } from 'react-bootstrap'
import Cartproduct from './Cartproduct'
import fb from '../firebase'

const Mycart = ({uid}) => {

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
      
        const db = fb.firestore();

        db.collection('users').doc(uid).get()
        .then((doc) => {
            const data = doc.data();
            setCartProducts(data.cart);
            console.log(data.cart)
        })

    }, [uid])

    const updateProducts = ()  => {
        
        const db = fb.firestore();

        db.collection('users').doc(uid).get()
        .then((doc) => {
            const data = doc.data();
            setCartProducts(data.cart);
            console.log(data.cart)
        })
    }

    return (
        <>
          <Header />
          <div className="cart-screen">
            <Container className="my-3 py-3">
                <h1>MY CART</h1>

                <Row>
                    { cartProducts.map((product) => (
                        <Col key={product.uid} sm={12} md={6} lg={4} className="my-3" >
                            <Cartproduct product={product} uid={uid}  updateProducts={updateProducts}/>
                        </Col>
                    ))}
                </Row>
            </Container>
          </div>
          <Footer />  
        </>
    )
}

export default Mycart
