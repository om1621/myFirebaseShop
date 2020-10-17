import * as firebase from 'firebase';
import React from 'react'
import { Card, Button } from 'react-bootstrap'
import fb from '../firebase'

const Cartproduct = ({product, uid, updateProducts}) => {

    const RemoveFromCart = (e) => {
        
        e.preventDefault();
        const db = fb.firestore();

        db.collection('users').doc(uid).update({
            cart: firebase.firestore.FieldValue.arrayRemove(product)
        })
        .then((res) => {
            console.log("successfully removed from cart");
            updateProducts();
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
                    <Card.Text className="text-center" >
                        <Button variant="outline-warning my-3" onClick={RemoveFromCart} > Remove from Cart </Button>
                    </Card.Text>
                   
                </Card.Body>
            </Card>
        </>
    )
}

export default Cartproduct
