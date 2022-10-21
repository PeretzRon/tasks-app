import React, {useEffect, useState} from 'react';
import classes from './Auth.module.css';
import {Avatar, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import Login from "./Login/Login";
import Register from "./Register/Register";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Lottie from 'react-lottie';
import animationData from '../../static/74569-two-factor-authentication.json';

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

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={classes.Auth}>
            {/*<Avatar className={classes.avatarLogo}>*/}
            {/*    <LockOutlinedIcon/>*/}
            {/*</Avatar>*/}


            <div>
                <Typography className={classes.title} component="h1" variant="h5">
                    {isLoginPage ? 'Sign in' : 'Sign up'}
                </Typography>
                {isLoginPage ? loginPage : registerPage}

            </div>
            <Lottie options={defaultOptions}
                    style={{marginTop: '40px'}}
                    height={190}
                    width={210}/>

        </div>
    );
};

export default Auth;
