import React, {useState} from 'react';
import {CircularProgress, Container, CssBaseline, Grid, Link, TextField} from "@mui/material";
import classes from "../Auth.module.css";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import * as api from "../../../api/tasksApi";
import {sleep, toastNotify} from "../../../Utils/commonMethods";
import {useDispatch} from "react-redux";
import {authActions} from "../../../store/auth";
import {tasksAction} from "../../../store/tasks";

const Login = ({register, handleSubmit, onChangedLoginRegisterPage}) => {

    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmitForm = async (data) => {
        setLoading(true);
        await sleep(300);
        const response = await (await api.authUser(data)).json();
        setLoading(false);
        if (!response.error) {
            toastNotify(response.msg, {type: 'success'});
            history.push("/tasks");
            dispatch(authActions.login());
            dispatch(tasksAction.replaceTasks(response.data))
        } else {
            toastNotify(response.msg, {type: 'error'});
        }
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
                        {loading && <CircularProgress className={classes.loadingSpinner}
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
