import React from 'react';
import Tasks from "./containers/Tasks/tasks";
import AppBarHeader from "./components/AppBar/appBarHeader";
import classes from './App.module.css';
import {Route, Switch} from 'react-router-dom';
import Auth from "./containers/Auth/Auth";
import {StyledEngineProvider} from "@mui/material";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <div className={classes.App}>
                <AppBarHeader/>
                <Switch>
                    <Route path={'/tasks'} component={Tasks}/>
                    <Route path={'/'} component={Auth}/>
                </Switch>
            </div>
            <ToastContainer position="bottom-left" autoClose={4000} hideProgressBar={false} newestOnTop={false}
                            closeOnClick rtl={false} draggable pauseOnHover
            />
        </StyledEngineProvider>

    );
}

export default App;
