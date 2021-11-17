import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import NoteCard from './noteCard'
import axios from 'axios';
import { isLoggedIn } from '../atoms';
import { useRecoilValue } from 'recoil';

//MUI
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import EditDialog from './editDialog';
import { Typography } from '@mui/material';

export default function Notes() {

    const login = useRecoilValue(isLoggedIn);
    const [notes, setNotes] = useState([]);
    const [data, setData] = useState(0);

    //Edit Note Dialog
    const [open, setOpen] = useState(false);
    const openDialog = () => setOpen(true);
    const close = () => setOpen(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setNotes(res.data);

            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    const handleDelete = async (id) => {
        await axios.delete('http://localhost:8000/api/delete-note/' + id, { withCredentials: true })
        window.location.reload();
    }

    const handleEdit = (id) => {
        setData(id);
        openDialog();
    }

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    };

    return (
        <Box sx={{ backgroundColor: "#e0f7fa", minHeight: "93vh" }}>
            {login ?
                <Container>
                    <Box sx={{ pt: 5 }}>
                        {notes && notes.length > 0 ?
                            <Masonry
                                breakpointCols={breakpoints}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column">
                                {notes.map(note => (
                                    <div key={note.ID}>
                                        <NoteCard note={note} handleDelete={handleDelete} handleEdit={handleEdit} />
                                    </div>
                                ))}
                            </Masonry>
                            :
                            <Typography variant="h6" gutterBottom component="div" sx={{mt: 5}}>
                                No notes created yet ....
                            </Typography>
                        }
                    </Box>
                    <EditDialog
                        open={open}
                        closeDialog={close}
                        id={data}
                    />
                </Container>
                :
                null
            }
        </Box>
    )
}
