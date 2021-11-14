import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Route, Switch } from "react-router-dom";
import SignUp from './components/signUp';
import Navbar from './components/navbar';
import Login from './components/login';
import Notes from './components/notes';
import NotFound from './components/notFound';
import { isLoggedIn } from './atoms';
import axios from 'axios';


function App() {

    const [login, setLogin] = useRecoilState(isLoggedIn);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/`, {withCredentials: true})
            .then((res) => {
                console.log(res);
                setLogin(true)
            })
            .catch(err => {
                console.log(err)
                setLogin(false)
            });
    })

    return (
        <>
            <Navbar/>
            <Switch>
                <Route path="/" component={SignUp} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/notes" component={login ? Notes : Login} exact />
                
                <Route component={NotFound} /> 
            </Switch>
        </>
    );
}

export default App;
