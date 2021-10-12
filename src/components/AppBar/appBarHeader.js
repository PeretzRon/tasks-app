import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {AppBar} from "@mui/material";
import styled from 'styled-components';

const AppBarHeader = () => {
    return (
        <Wrapper>
            <Box className='root' sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography className='title' variant="h6" component="div" sx={{flexGrow: 1}}>
                            Tasks
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  .root {
    margin-bottom: 10px;
  }

  .title {
    font-size: 2rem;
    letter-spacing: 3px;
    font-weight: bold;
  }
`;


export default AppBarHeader;
