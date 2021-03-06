import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {AppBar} from "@mui/material";
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {authActions} from "../../store/auth";
import {tasksAction} from "../../store/tasks";

const AppBarHeader = () => {

    const history = useHistory();
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const userFullName = useSelector(state => state.auth.fullName);

    const onLoginClick = () => {
        history.push('/');
    };

    const onLogoutClick = () => {
        history.push('/');
        dispatch(authActions.logout());
        dispatch(tasksAction.deleteAllTasks());
        document.cookie.split(";")
            .forEach(function (c) {
                document.cookie = c.replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
    };

    return (
        <Wrapper>
            <Box className="root" sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        {userFullName && <Typography component="div">
                            Hello, {userFullName}
                        </Typography>}

                        <Typography className="title" variant="h6" component="div" sx={{flexGrow: 1}}>
                            Tasks
                        </Typography>
                        {!isAuth && <Button onClick={onLoginClick} color="inherit">Login</Button>}
                        {isAuth && <Button onClick={onLogoutClick} color="inherit">Logout</Button>}
                    </Toolbar>
                </AppBar>
            </Box>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  .root {
    margin-bottom: 10px;
  }

  .title {
    font-size: 2rem;
    letter-spacing: 3px;
    font-weight: bold;
  }
`;


export default AppBarHeader;
