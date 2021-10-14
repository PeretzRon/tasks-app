import React, {useState} from 'react';
import {CircularProgress, Container, CssBaseline, Grid, Link, TextField} from "@mui/material";
import classes from "../Auth.module.css";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import * as api from "../../../api/tasksApi";
import {sleep} from "../../../Utils/commonMethods";

const Login = ({register, handleSubmit, onChangedLoginRegisterPage}) => {

    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onSubmitForm = async (data) => {
        setLoading(true);
        await sleep(1000);
        const response = await api.authUser(data);
        if (response.status === 200) {
            history.push("/tasks");
        } else {
            // TODO: add logic
        }
        setLoading(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div>
                <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)}>
                    <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address"
                               name="email"
                               {...register('email')}
                    />
                    <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password"
                               type="password" id="password"
                               {...register('password')}
                    />
                    <div style={{position: 'relative'}}>
                        <Button type="submit" disabled={loading} fullWidth variant="contained" color="primary"
                                className={classes.submit}>
                            Sign In
                        </Button>
                        {loading &&  <CircularProgress className={classes.loadingSpinner}
                            size={24}
                        />}
                    </div>
                    <Grid container>
                        <Grid item>
                            <Link style={{cursor: "pointer"}} onClick={onChangedLoginRegisterPage} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Login;
