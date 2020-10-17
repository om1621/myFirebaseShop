import React , {useState, useEffect} from 'react'
import fb from './firebase';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import './bootstrap.min.css'
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import Productscreen from './components/Productscreen';
import Mycart from './components/Mycart'
import loader from './loading.gif'

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {

        fb.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(true);
        });

    }, []);

  return (
     
      <Router> 

        { !loading ? ( 
          <div className="home-screen" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
            <img src={loader} alt="loader"/>
          </div>
         ) 
         : 
         (
         <> 
            { currentUser ?  
              ( 
                <> 
                <Route path="/" render={(props) => (
                  <Homepage {...props} uid={currentUser.email} />
                )} exact /> 

                <Route path="/products/:id/:uid" component={Productscreen} /> 
                <Route path="/cart" render = {(props) => (
                  <Mycart {...props} uid={currentUser.email} /> )
                } />
                </> 
              ) 
              : 
              ( 
                <> 
                <Route path="/" component={Signup} exact />
                <Route path="/login" component={Login}/> 
                </> 
              )
          }
          </>
        )
      }

        
       
        
      </Router>
  );
}

export default App;
