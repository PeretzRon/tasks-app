import React from 'react';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

const FilteredArea = props => {

    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const onAction = event => {
        props.filterAreaAction(event.target.textContent);
    };

    return (
        <div>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton onClick={onAction} value="web">All</ToggleButton>
                <ToggleButton onClick={onAction} value="android">Done tasks</ToggleButton>
                <ToggleButton onClick={onAction} value="ios">Undone tasks</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default FilteredArea;
