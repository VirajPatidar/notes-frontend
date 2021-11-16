import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { isLoggedIn } from '../atoms';
import { useRecoilValue } from 'recoil';

//MUI
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const field = {
    marginTop: 3,
    marginBottom: 3,
    display: 'block'
}

const categories = ['Finance', 'Todos', 'Reminders', 'Work', 'Study', 'Sports', 'Meeting', 'Others'];

export default function CreateNote() {
    const login = useRecoilValue(isLoggedIn);
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)
    const [category, setCategory] = useState('Work')

    const handleSubmit = (e) => {
        e.preventDefault()
        setTitleError(false)
        setDetailsError(false)

        if (title === '') {
            setTitleError(true)
        }
        if (details === '') {
            setDetailsError(true)
        }
        if (title && details) {
            axios.post(`http://localhost:8000/api/create-note`, {
                "title": title,
                "category": category,
                "details": details
            }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                history.push('/notes');
            })
            .catch(err => { 
                console.log(err)
            });
        }
    }

    return (
        <Box>
            {login ?
                <Container size="sm">
                    <Typography
                        sx={{ mt: 10 }}
                        variant="h5"
                        color="textPrimary"
                        component="h2"
                        gutterBottom
                    >
                        Create a New Note
                    </Typography>

                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField sx={field}
                            onChange={(e) => setTitle(e.target.value)}
                            label="Note Title"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            required
                            error={titleError}
                        />
                        <TextField sx={field}
                            onChange={(e) => setDetails(e.target.value)}
                            label="Details"
                            variant="outlined"
                            color="primary"
                            multiline
                            rows={4}
                            fullWidth
                            required
                            error={detailsError}
                        />

                        <Autocomplete
                            disablePortal
                            freeSolo
                            id="combo-box-demo"
                            options={categories}
                            sx={field}
                            onChange={(e, val) => setCategory(val)}
                            renderInput={(params) => <TextField {...params} label="Category" onChange={(e) => setCategory(e.target.value)}/>}
                        />

                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            endIcon={<KeyboardArrowRightIcon />}>
                            Submit
                        </Button>
                    </form>
                </Container>
                :
                null
            }
        </Box>
    )
}
