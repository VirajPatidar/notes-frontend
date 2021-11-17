import React, { useEffect, useState } from 'react';
import axios from 'axios';


//MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const field = {
    marginTop: 3,
    marginBottom: 3,
    display: 'block',
    width: '500px'
}

const categories = ['Finance', 'Todos', 'Reminders', 'Work', 'Study', 'Sports', 'Meeting', 'Others'];


export default function EditDialog(props) {

    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [titleError, setTitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)
    const [category, setCategory] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:8000/api/note/${props.id}`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setTitle(res.data.Title);
                setDetails(res.data.Details);
                setCategory(res.data.Category);
            })
            .catch(err => {
                console.log(err)
            });
    },[props])

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
            axios.put(`http://localhost:8000/api/update-note/${props.id}`, {
                "title": title,
                "category": category,
                "details": details
            },
            { withCredentials: true })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                //props.closeDialog();
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
            });
        }
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.closeDialog}>
                <DialogTitle>Edit Note</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField sx={field}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            label="Note Title"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            required
                            error={titleError}
                        />
                        <TextField sx={field}
                            value={details}
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
                            value={category}
                            disablePortal
                            freeSolo
                            id="combo-box-demo"
                            options={categories}
                            sx={field}
                            onChange={(e, val) => setCategory(val)}
                            renderInput={(params) => <TextField {...params} label="Category" onChange={(e) => setCategory(e.target.value)} />}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.closeDialog} variant="outlined">Cancel</Button>
                    <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
