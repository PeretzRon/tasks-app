import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import styled from "styled-components";

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
                <DialogTask>
                    <DialogTitle className='dialogTitle'>
                        Add new task
                    </DialogTitle>
                    <DialogContent className={'dialogContent'}>
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
                    <DialogActions className={'dialogAction'}>
                        <Button onClick={props.onClose} variant="outlined" color="error">
                            Close
                        </Button>
                        <Button onClick={handleSubmit(onSubmit)} type="submit" variant="outlined" color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </DialogTask>
            </Dialog>
    );
};

const DialogTask = styled.div`
  
  .dialogTitle {
    margin: 0 0 20px 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .dialogTitle {
    background-color: hsla(211, 100%, 84%, 0.58);
  }

  .dialogTitle h2 {
    font-size: 1.4rem;
    font-weight: bold;
  }
  .dialogContent {
    display: flex;
    flex-direction: column;
  }
  .dialogContent * {
    margin: 5px;
  }

  .dialogAction {
    background-color: hsla(210, 100%, 89%, 0.58);
  }
`;

export default AddTaskDialog;
