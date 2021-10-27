import React, {useEffect, useState} from 'react';
import Task from "../../components/Task/task";
import Searchbar from "../../components/Searchbar/searchbar";
import FilteredArea from "../../components/FilteredArea/filteredArea";
import classes from './tasks.module.css';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddTaskDialog from "../../components/AddTaskDialog/addTaskDialog";
import {getTasks} from "../../api/tasksApi";
import {CircularProgress, Grid} from "@mui/material";
import {useHistory} from "react-router-dom";
import {sleep, toastNotify} from "../../Utils/commonMethods";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth";
import {tasksAction} from "../../store/tasks";
import {addNewTaskAction, deleteTaskAction, markToggleCompleteTask} from "../../store/tasks-actions";


const Tasks = () => {
    const [inputFromSearch, setInputFromSearch] = useState("");
    const [filterAction, setFilterAction] = useState('All');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.tasks.loading);
    const tasks = useSelector(state => state.tasks.tasks);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                dispatch(tasksAction.setLoading(true));
                await sleep(100);
                const response = await (await getTasks()).json();
                if (response.error) {
                    toastNotify("Token expire, please log in", {type: 'error'});
                    history.push('/');
                    dispatch(tasksAction.setLoading(false));
                } else {
                    dispatch(authActions.login({firstName: response.data.firstName, lastName: response.data.lastName}));
                    dispatch(tasksAction.replaceTasks(response.data.tasks));
                }
            } catch (error) {
                dispatch(tasksAction.setLoading(false));
            }
        };

        if (tasks.length === 0) {
            fetchTasks();
        }
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
        dispatch(markToggleCompleteTask(tasks, id, callback => {
            toastNotify(callback.msg, {type: callback.type});
            if (callback.isUnauthorized) {
                dispatch(authActions.logout());
                history.push('/');
            }
        }));
    };

    const onDeleteTaskAction = id => async event => {
        dispatch(deleteTaskAction(tasks, id, callback => {
            toastNotify(callback.msg, {type: callback.type});
            if (callback.isUnauthorized) {
                dispatch(authActions.logout());
                history.push('/');
            }
        }));
    };

    const addNewTask = async newTask => {
        dispatch(addNewTaskAction(tasks, newTask, callback => {
            if (callback.error) {
                console.error('failed to Add');
            } else {
                setIsDialogOpen(false);
            }
        }));
    };

    let tasksToRender = tasks
        .filter(filterTask)
        .filter(task => task.title.toLowerCase().includes(inputFromSearch.toLowerCase()))
        .map(task => {
            return <Task key={task._id} {...task}
                         toggleMark={onMarkToggleAction(task._id)}
                         deleteTask={onDeleteTaskAction(task._id)}/>;
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

    const page = loading ? loadingTasks : tasksSection;

    return (
        <div className={classes.main}>
            {page}
        </div>
    );
};

export default Tasks;
