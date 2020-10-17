import * as firebase from 'firebase';
import React from 'react'
import { Card, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import fb from '../firebase'

const Product = ({product, uid}) => {

    const addToCart = (e) => {
        
        e.preventDefault();
        const db = fb.firestore();

        db.collection('users').doc(uid).update({
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
            <Card>
                <div className="text-center py-3" >
                    <Card.Img variant="top" src={product.image} className="card-image my-3"/>
                </div>
                <Card.Body>
                    <Card.Title style={{height: "75px", overflow:"hidden"}} >
                       {product.name}
                    </Card.Title> 
                    <Card.Text>
                        Price: {product.price}
                    </Card.Text>
                    <Card.Text>
                        Rating: {product.rating} | {product.numReviews} user ratings
                    </Card.Text>
                    <Button variant="outline-success" className="m-3" onClick={addToCart} > Add To Cart </Button>
                    <Link to={`/products/${product.uid}/${uid}`}>
                        <Button variant="outline-success" className="m-3 "> See Details </Button>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}

export default Product
