import React, {useEffect, useState} from 'react';
import classes from './Auth.module.css';
import {Avatar, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import Login from "./Login/Login";
import Register from "./Register/Register";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


const Auth = props => {

    const {
        register,
        setValue,
        handleSubmit,
        // formState: {errors},
    } = useForm();

    const [isLoginPage, setIsLoginPage] = useState(true);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, []);

    const onChangedLoginRegisterPage = () => {
        setIsLoginPage(!isLoginPage);
        setValue('password', "");
    };


    const loginPage = <Login
        register={register}
        onChangedLoginRegisterPage={onChangedLoginRegisterPage}
        handleSubmit={handleSubmit}/>;

    const registerPage = <Register
        register={register}
        onChangedLoginRegisterPage={onChangedLoginRegisterPage}
        handleSubmit={handleSubmit}/>;

    return (
        <div className={classes.Auth}>
            <Avatar className={classes.avatarLogo}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography className={classes.title} component="h1" variant="h5">
                {isLoginPage ? 'Sign in' : 'Sign up'}
            </Typography>
            {isLoginPage ? loginPage : registerPage}

        </div>
    );
};

export default Auth;
