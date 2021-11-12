import { Route, Switch } from "react-router-dom";
import SignUp from './components/signUp';
import Navbar from './components/navbar';
import Login from './components/login';
import Notes from './components/notes';
import NotFound from './components/notFound';


function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" component={SignUp} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/notes" component={Notes} exact />

                {/* 
                    <Route path="/register" component={log ? Dashboard : Register} exact />
                    <Route path="/login" component={log ? Dashboard : Login} exact />
                */}
                
                <Route component={NotFound} /> 
            </Switch>
        </>
    );
}

export default App;
