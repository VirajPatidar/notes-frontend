import * as React from 'react';

//MUI
import LoginIcon from '@mui/icons-material/Login';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        href="/"
                    >
                        <StickyNote2OutlinedIcon fontSize="large"/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NOTE
                    </Typography>
                    <Button color="inherit" variant="outlined" startIcon={<LoginIcon />} href="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
