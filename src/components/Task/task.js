import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';
import {Box, Card, CardContent, Typography} from "@mui/material";
import styled from "styled-components";


const Task = props => {
    const {title, description, isDone} = props;
    return (
        <TaskCard>
            <Card className={`root ${isDone && 'doneTask'}`}>
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
        </TaskCard>
    );
};

const TaskCard = styled.div`

  .root {
    border: 1px solid #ccc;
    padding: 10px;
    min-width: 300px;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    background-color: #d1dbf6;
  }

  .root:hover {
    background-color: #bbc9ee;
  }

  .root * {
    margin: 0 10px;
  }

  .doneTask {
    text-decoration: line-through;
    animation: strike 0.5s linear;
  }

  @keyframes strike {
    from {
      text-decoration-color: transparent;
    }
    to {
      text-decoration-color: black;
    }
  }

`;

export default Task;
