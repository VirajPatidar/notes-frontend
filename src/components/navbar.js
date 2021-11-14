import React from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { isLoggedIn } from '../atoms';
import { useRecoilState } from 'recoil';

//MUI
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function Navbar() {

    const [login, setLogin] = useRecoilState(isLoggedIn);
    const history = useHistory();

    const logout = () => {
        axios.post(`http://localhost:8000/api/logout`, {}, { withCredentials: true })
            .then((res) => {
                console.log(res);
                setLogin(false);
                localStorage.clear();
                history.push('/login');
            })
            .catch(err => {
                console.log(err)
            });
    };

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
                        <StickyNote2OutlinedIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NOTE
                    </Typography>
                    {login ?
                        <Button color="inherit" variant="outlined" startIcon={<LogoutIcon />} onClick={logout}>
                            Logout
                        </Button>
                        :
                        <Button color="inherit" variant="outlined" startIcon={<LoginIcon />} href="/login">
                            Login
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
