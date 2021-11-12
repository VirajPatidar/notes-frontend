import { Route, Switch } from "react-router-dom";
import Register from './components/register';
import Navbar from './components/navbar';
import Login from './components/login';
import Todo from './components/todo';


function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" component={Register} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/todo" component={Todo} exact />

                {/* <Route path="/register" component={log ? Dashboard : Register} exact />
                <Route path="/login" component={log ? Dashboard : Login} exact />
                <Route component={NotFound} /> */}
            </Switch>
        </>
    );
}

export default App;
