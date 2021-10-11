import React, {useEffect, useState} from 'react';
import {Redirect, useHistory} from "react-router-dom";
import classes from './Auth.module.css';
import {
    Alert,
    Avatar,
    Box,
    Container,
    CssBaseline,
    Grid,
    LinearProgress, Link, Snackbar,
    TextField,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {authUser, createUser} from "../../api/tasksApi";

const Auth = props => {

    const {
        register,
        setValue,
        handleSubmit,
        // formState: {errors},
    } = useForm();
    const [isSignUp, setIsSignUp] = useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const history = useHistory();

    useEffect(() => {
        window.scrollTo({top: 0});
    }, []);


    const onSubmitHandler = async (data) => {
        if (isSignUp) {
            const response = await createUser(data);
            console.log(response.status);
            if (response.status === 400) {
                setOpenAlert(true);
            }
        } else {
            const response = await authUser(data);
            if (response.status === 200) {
                history.push("/tasks");
            }
        }
    };

    const isSignUpToggle = () => {
        setIsSignUp(!isSignUp);
        setValue('password', "");
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    let showMessage = <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="success" sx={{width: '100%'}}>
            This is a success message!
        </Alert>
    </Snackbar>;

    let spinner = props.loading ? <div className={classes.form}><LinearProgress/></div> : null;
    let authPage = null;
    if (isSignUp) {
        authPage = <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatarLogo}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography className={classes.title} component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmitHandler)}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                {...register('firstName')}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                {...register('lastName')}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                {...register('email')}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register('password')}
                            />
                        </Grid>

                    </Grid>
                    {spinner}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link style={{cursor: "pointer"}} onClick={isSignUpToggle} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
            </Box>
        </Container>;
    } else {
        authPage = <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatarLogo}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography className={classes.title} component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmitHandler)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        {...register('email')}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        {...register('password')}
                    />
                    {spinner}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item>
                            <Link style={{cursor: "pointer"}} onClick={isSignUpToggle} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>;
    }

    let authRedirect = null;
    if (props.isAuthenticated && !props.message) {
        authRedirect = <Redirect to={'/tasks'}/>;
    }

    return (
        <div className={classes.Auth}>
            {showMessage}
            {authRedirect}
            {authPage}
        </div>
    );
};

export default Auth;
