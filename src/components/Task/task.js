import React, {useRef, useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ReplayIcon from '@mui/icons-material/Replay';
import {Box, Card, CardContent, Grid, Tooltip, Typography} from "@mui/material";
import styled from "styled-components";
import {Circle} from "react-color/lib/components/circle/Circle";
import {updateTask} from "../../api/tasksApi";


const Task = props => {
    const {title, description, isDone, color} = props;
    const [openColor, setOpenColor] = useState(false);
    const colorRef = useRef(null);

    async function onSaveColor(color, event) {
        colorRef.current.style.backgroundColor = color.hex;
        updateTask({...props, color: color.hex});
        setOpenColor(false);
    }

    function openColorFunc() {
        setOpenColor(prevState => !prevState);
    }

    return (
        <Grid item>
            <TaskCard>
                <Card ref={colorRef} style={{backgroundColor: color}} className={`root ${isDone && 'doneTask'}`}>
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

                            <span onMouseOver={() => setOpenColor(true)}
                                 onMouseLeave={() => setOpenColor(false)}>
                                <Tooltip arrow open={openColor} title={<React.Fragment>
                                    <div>
                                        <Circle onChange={onSaveColor}
                                                colors={["#f44336", "#e91e63", "#9c27b0", "#8bc34a",
                                                    "#cddc39", "#ffeb3b", "#fff", "#ff9800", "#ff5722", "#795548", "#607d8b", "#03a9f4"]}
                                        />
                                    </div>
                                </React.Fragment>} children={<ColorLensIcon onClick={openColorFunc}/>}>
                                </Tooltip>
                            </span>
                        </Box>
                    </Box>
                </Card>
            </TaskCard>
        </Grid>
    );
};

const TaskCard = styled.div`

  .root {
    border: 2px solid #ccc;
    padding: 10px;
    min-width: 300px;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.3s ease-in;
    border-radius: 4px;
    box-shadow: 1px 1px 2px #bbc9ee;
  }

  .root:hover {
    transform: scale(1.02, 1.02);
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
