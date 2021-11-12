import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import Copyright from './copyright'

//MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';


const theme = createTheme();

function TransitionLeft(props) {
	return <Slide {...props} direction="left" />;
}

export default function Login() {

    const history = useHistory();
    const initialFormData = Object.freeze({
        email: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [emailerror, setEmailerror] = useState(false);
    const [passerror, setPasserror] = useState(false);
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setEmailerror(false)
        setPasserror(false)

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(formData);

        // Validation
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let submit = true

        setEmailerror(false)
        setPasserror(false)

        if (formData.email === "" || !re.test(formData.email)) {
            setEmailerror(true)
            submit = false
            console.log(submit)
            console.log(formData.email)
        }
        if (formData.password === "" || formData.password.length < 6) {
            setPasserror(true)
            submit = false
            console.log(submit)
            console.log(formData.password)
        }


        if (submit) {
            axios.post(`http://localhost:8000/api/login`, {
                    "email": formData.email,
                    "password": formData.password,
                }, {withCredentials: true})
                .then((res) => {
                    console.log(res);
                    console.log(res.data);

                    history.push('/notes');

                })
                .catch(err => { 
					console.log(err)
					if (err.response.status === 400) {
                        setMessage("Invalid Login Credentials! Please Try Again")
						setTransition(() => TransitionLeft);
						setOpen(true);
					}
					else if (err.response.status === 404) {
                        setMessage("User does not exist!! Please SignUp first")
						setTransition(() => TransitionLeft);
						setOpen(true);
					}
				});
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                            error={emailerror}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            error={passerror}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright/>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={transition}
                    message={message}
                    key={'bottom center'}
                />
            </Container>
        </ThemeProvider>
    );
}