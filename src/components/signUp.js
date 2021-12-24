import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Copyright from './copyright'
import axios from 'axios';

//IMAGE
import notes from '../images/notes.svg';

//MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

const theme = createTheme();

function TransitionLeft(props) {
	return <Slide {...props} direction="left" />;
}

export default function SignUp() {

    const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		name: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [emailerror, setEmailerror] = useState(false);
	const [nameerror, setNameerror] = useState(false);
	const [passerror, setPasserror] = useState(false);


    //Snackbar
	const [open, setOpen] = useState(false);
	const [transition, setTransition] = useState(undefined);


    const handleChange = (e) => {
		setEmailerror(false)
		setNameerror(false)
		setPasserror(false)

		updateFormData({
			...formData,
			// Trimming any whitespace
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
		setNameerror(false)
		setPasserror(false)

		if (formData.email === "" || !re.test(formData.email)) {
			setEmailerror(true)
			submit = false
			console.log(submit)
			console.log(formData.email)
		}
		if (formData.name === "" || formData.name.length < 3 || formData.name.length > 19 || /\d/.test(formData.name)) {
			setNameerror(true)
			submit = false
			console.log(submit)
			console.log(formData.name)
		}
		if (formData.password === "" || formData.password.length < 5) {
			setPasserror(true)
			submit = false
			console.log(submit)
			console.log(formData.password)
		}

		
		if (submit) {
			axios.post(`https://go-notes-backend.herokuapp.com/api/register`, {
					"email": formData.email,
					"name": formData.name,
					"password": formData.password,
				})
				.then((res) => {
					console.log(res);
					console.log(res.data);
                    history.push('/login');
				})
				.catch(err => { 
					console.log(err)
					if (err.response.status === 404) {
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
            <Grid container component="main" sx={{ height: '92vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundColor: blue[200],
                        backgroundImage: `url(${notes})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'auto',
                        backgroundPosition: 'center',
                    }}
                >
                    <Typography variant="h2" gutterBottom align="left" mb={0}>
						<Box fontWeight="fontWeightLight" mt={3} ml={3} mb={0}>
                            Note
						</Box>
					</Typography>
                    <Typography variant="h6" gutterBottom align="left">
						<Box lineHeight={1.3} fontWeight="fontWeightLight" ml={5}>
                            - Online note-making application
						</Box>
					</Typography>
                </Grid>
                
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
										variant="outlined"
										required
										fullWidth
										id="Name"
										label="Name"
										name="name"
										autoComplete="name"
										onChange={handleChange}
										error={nameerror}
									/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Email Address"
										type="email"
										name="email"
										autoComplete="email"
										onChange={handleChange}
										error={emailerror}
									/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
										variant="outlined"
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
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        <Copyright/>
                    </Box>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						open={open}
						onClose={handleClose}
						TransitionComponent={transition}
						message="User Already Exists!! Please use another ID"
						key={'bottom center'}
					/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}