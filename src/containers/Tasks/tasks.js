import React, {useEffect, useState} from 'react';
import Task from "../../components/Task/task";
import Searchbar from "../../components/Searchbar/searchbar";
import FilteredArea from "../../components/FilteredArea/filteredArea";
import classes from './tasks.module.css';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddTaskDialog from "../../components/AddTaskDialog/addTaskDialog";
import {addTask, deleteTask, getTasks, updateTask} from "../../api/tasksApi";
import {CircularProgress, Grid} from "@mui/material";
import {useHistory} from "react-router-dom";
import {sleep, toastNotify} from "../../Utils/commonMethods";


const Tasks = () => {
    const [tasksState, setTasksState] = useState({loading: true, tasks: []});
    const [inputFromSearch, setInputFromSearch] = useState("");
    const [filterAction, setFilterAction] = useState('All');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                await sleep(700);
                const response = await (await getTasks()).json();
                if (response.error) {
                    toastNotify("Token expire, please log in", {type: 'error'});
                    history.push('/');
                } else {
                    setTasksState({loading: false, tasks: response.data});
                }
            } catch (error) {
                setTasksState({...tasksState, loading: false});
            }
        };

        fetchTasks();
    }, []);


    const openDialogAction = () => {
        setIsDialogOpen(true);
    };

    const onCloseAction = () => {
        setIsDialogOpen(false);
    };

    const onFilterAreaAction = buttonName => {
        setFilterAction(buttonName);
    };

    const filterTask = (task) => {
        return filterAction === 'All' ||
            (task.isDone && filterAction !== 'Undone tasks') ||
            (!task.isDone && filterAction !== 'Done tasks');
    };

    const onSearchFilterAction = event => {
        setInputFromSearch(event.target.value);
    };

    const onMarkToggleAction = id => async event => {
        const indexToUpdate = tasksState.tasks.findIndex(task => task._id === id);
        const taskToUpdate = tasksState.tasks[indexToUpdate];
        taskToUpdate.isDone = !taskToUpdate.isDone;
        const response = await (await updateTask(taskToUpdate)).json();
        if (response.error) {
            toastNotify("Token expire, please log in", {type: 'error'});
            history.push('/');
        } else {
            tasksState.tasks[indexToUpdate] = {...tasksState.tasks[indexToUpdate]};
            setTasksState({...tasksState});
        }
    };

    const onDeleteTaskAction = id => async event => {
        const response = await (await deleteTask(id)).json();
        if (response.error) {
            toastNotify(response.msg, {type: 'error'});
            if (!response.isAuth) {
                history.push('/');
            }
        } else {
            const updatedTaskAfterDelete = tasksState.tasks.filter(value => value._id !== id);
            setTasksState({...tasksState, tasks: updatedTaskAfterDelete});
            toastNotify(response.msg, {type: 'info'});
        }
    };

    const addNewTask = async newTask => {
        const clonedTasks = [...tasksState.tasks];
        newTask.isDone = false;
        const response = await addTask(newTask);
        if (response.status === 201) {
            const taskId = await response.json();
            clonedTasks.push({
                title: newTask.title,
                description: newTask.description,
                isDone: false,
                _id: taskId._id
            });
            setTasksState({...tasksState, tasks: clonedTasks});
            setIsDialogOpen(false);
        } else {
            console.error('failed to Add');
        }
    };

    let tasksToRender = tasksState.tasks
        .filter(filterTask)
        .filter(task => task.title.toLowerCase().includes(inputFromSearch.toLowerCase()))
        .map(task => {
            return <Task key={task._id} {...task}
                         toggleMark={onMarkToggleAction(task._id)}
                         deleteTask={onDeleteTaskAction(task._id)}
            />;
        });

    const loadingTasks = (<div className={classes.loading}>
        <CircularProgress size={100} color="primary"/>
    </div>);
    const tasksSection = (<div>
        <div className={classes.searchbar}>
            <Searchbar
                searchFilterAction={onSearchFilterAction}/>
        </div>
        <div className={classes.filterButtons}>
            <FilteredArea
                filterAreaAction={onFilterAreaAction}/>
        </div>
        <div className={classes.tasksList}>
            <Grid container spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {tasksToRender}
            </Grid>
        </div>
        <div className={classes.addIcon}>
            <AddCircleIcon onClick={openDialogAction} style={{fontSize: '4rem', color: "#1976D2"}}/>
        </div>
        {isDialogOpen && <AddTaskDialog isOpen={isDialogOpen}
                                        onAddNewTask={(data) => addNewTask(data)}
                                        onClose={onCloseAction}/>}
    </div>);

    const page = tasksState.loading ? loadingTasks : tasksSection;

    return (
        <div className={classes.main}>
            {page}
        </div>
    );
};

export default Tasks;
