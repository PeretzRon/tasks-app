import React from 'react';
import classes from './task.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';
import {Box, Card, CardContent, Typography} from "@mui/material";
// import styled from "styled-components";
//
// const Task = styled.`
//   background-color: red;
// `;

const Task = props => {
    const {title, description, isDone} = props;
    return (
        <Card className={`${classes.root} ${isDone && classes.doneTask}`}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h5">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {description}
                        </Typography>
                    </CardContent>
                    <Box>
                        <DeleteIcon onClick={props.deleteTask}/>
                        {isDone ? <ReplayIcon onClick={props.toggleMark}/> :
                            <CheckCircleIcon onClick={props.toggleMark}/>}
                    </Box>
                </Box>
        </Card>

    );
};

export default Task;
