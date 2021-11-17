import React from 'react'

//MUI
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar'
import { yellow, green, pink, blue } from '@mui/material/colors'


export default function NoteCard({ note, handleDelete, handleEdit }) {

    const bg = [yellow[700], green[500], pink[500], blue[500]]

    return (
        <div>
            <Card raised={true}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ backgroundColor: bg[Math.floor((Math.random() * 4))] }}>
                            {note.Category[0].toUpperCase()}
                        </Avatar>}
                    action={
                        <>
                            <IconButton onClick={() => handleEdit(note.ID)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(note.ID)}>
                                <DeleteOutlined />
                            </IconButton>
                        </>
                    }
                    title={note.Title}
                    subheader={note.Category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {note.Details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}