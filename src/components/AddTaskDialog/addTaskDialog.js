import React from "react";
import classes from './addTaskDialog.module.css';
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";

const AddTaskDialog = props => {
    const {
        register,
        handleSubmit,
        // formState: {errors},
    } = useForm();

    const onSubmit = (data) => props.onAddNewTask(data);

    return (
        <Dialog
            open={props.isOpen}
            hideBackdrop={false}
            onClose={props.onClose}
        >
            <DialogTitle className={classes.dialogTitle}>
                Add new task
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <TextField
                    {...register('title')}
                    id="outlined-multiline-flexible"
                    label="Title"
                    multiline
                    maxRows={1}
                />

                <TextField
                    {...register('description')}
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={4}
                />
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button onClick={props.onClose} variant="outlined" color="error">
                    Close
                </Button>
                <Button onClick={handleSubmit(onSubmit)} type="submit" variant="outlined" color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTaskDialog;
