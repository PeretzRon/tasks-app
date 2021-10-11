import React from 'react';
import {TextField} from "@mui/material";

const Searchbar = props => {
    return (
        <div>
            <TextField id="outlined-basic" label="filter your tasks.." onChange={props.searchFilterAction} variant="outlined" />
        </div>
    );
};

export default Searchbar;
