import React, { useState } from 'react';
import { BrowserRouter, Redirect,Route, Switch } from 'react-router-dom';
import FirstStep from '../components/FirstStep';
import Header from '../components/Header';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';
import Login from '../components/Login';
import Welcome from '../components/Welcome';
import Sidebar from '../layout/Sidebar';
import { useAuth } from '../auth/auth';
import { AuthContext } from '../context/auth-context';
const AppRouter = () => {
const { token, login, logout, userId } = useAuth();
 
//console.log(token) 
const[user,setUser] = useState([]);
 
    const updateUser = (data) => {
      setUser((prevUser) => {
        return {
          ...prevUser,
          ...data
        };
      });
    };

    const resetUser = () => {
      setUser({});
    };

    let routes;
    
    if (!token) { 
    routes = (<>
      <div className="container">
        <Header /> 
        <Switch>
          <Route
            render={(props) => (
              <FirstStep {...props} user={user} updateUser={updateUser} />
            )}
            path="/"
            exact={true}
          />
          <Route
            render={(props) => (
              <SecondStep {...props} user={user} updateUser={updateUser} />
            )}
            path="/second"
          />
          <Route
            render={(props) => (
              <ThirdStep {...props} user={user}  />
            )}
            path="/third"
          />

          <Route component={Login} path="/login" />
          
          <Route render={() => <Redirect to="/" />} />     
        </Switch>
        
      </div> 
      </>
      
    );
    }else{
    routes = (<>
          <div className="container">
          
            <Sidebar/>
            
            <Switch>
              
              <Route component={Welcome} path="/welcome" />
                
            </Switch>   
            
          </div>
          </>
    );
    }
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
      >
        <BrowserRouter>
        <main>{routes}</main>
        </BrowserRouter>
      </AuthContext.Provider>
    );
      };  
export default AppRouter;