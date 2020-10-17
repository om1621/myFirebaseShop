import React from 'react';
import Header from './Header'
import Footer from './Footer'
import Homescreen from './Homescreen'

const Homepage = ({uid}) => {
    return (
        <>
            <Header />
            <Homescreen uid={uid} />
            <Footer />
        </>
    )
}

export default Homepage;
