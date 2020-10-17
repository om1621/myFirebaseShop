import React, {useState, useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import { Container, Row, Col } from 'react-bootstrap'
import Cartproduct from './Cartproduct'
import fb from '../firebase'
import loader from '../loading.gif'

const Mycart = ({uid}) => {

    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      
        const db = fb.firestore();

        db.collection('users').doc(uid).get()
        .then((doc) => {
            const data = doc.data();
            setCartProducts(data.cart);
            setLoading(false);
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

          { loading ? ( 
                    <div className="home-screen" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                        <img src={loader} alt="loader"/>
                    </div>
                    )
                    :
                    (
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
                    )
          }
          
          <Footer />  
        </>
    )
}

export default Mycart
