import React, {useState} from 'react';
import {CircularProgress, Container, CssBaseline, Grid, Link, TextField} from "@mui/material";
import classes from "../Auth.module.css";
import Button from "@mui/material/Button";
import * as api from "../../../api/tasksApi";
import {toastNotify} from "../../../Utils/commonMethods";

const Register = ({register, handleSubmit, onChangedLoginRegisterPage}) => {

    const [loading, setLoading] = useState(false);

    const onSubmitForm = async (userInput) => {
        setLoading(true);
        const response = await (await api.createUser(userInput)).json();
        setLoading(false);
        if (response.error) {
            toastNotify(response.msg, {type: 'error'});
        } else {
            toastNotify(response.msg, {type: 'success'});
            onChangedLoginRegisterPage();
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div>
                <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="fname" name="firstName" variant="outlined" required fullWidth
                                       id="firstName" label="First Name"
                                       {...register('firstName')}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField variant="outlined" required fullWidth id="lastName" label="Last Name"
                                       name="lastName" autoComplete="lname"
                                       {...register('lastName')}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth id="email" label="Email Address"
                                       name="email" autoComplete="email"
                                       {...register('email')}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth name="password" label="Password"
                                       type="password" id="password" autoComplete="current-password"
                                       {...register('password')}
                            />
                        </Grid>

                    </Grid>
                    <div style={{position: 'relative'}}>
                        <Button disabled={loading} type="submit" fullWidth variant="contained" color="primary"
                                className={classes.submit}>
                            Sign Up
                        </Button>
                        {loading && <CircularProgress className={classes.loadingSpinner}
                                                      size={24}
                        />}
                    </div>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link style={{cursor: "pointer"}} onClick={onChangedLoginRegisterPage} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Register;
