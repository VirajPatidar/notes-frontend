import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import Avatar from '@mui/material/Avatar'
import { yellow, green, pink, blue } from '@mui/material/colors'

// const useStyles = makeStyles({
//     avatar: {
//         backgroundColor: (note) => {
//             if (note.category == 'work') {
//                 return yellow[700]
//             }
//             if (note.category == 'money') {
//                 return green[500]
//             }
//             if (note.category == 'todos') {
//                 return pink[500]
//             }
//             return blue[500]
//         },
//     }
// })

export default function NoteCard({ note, handleDelete }) {

    const bg = [yellow[700], green[500], pink[500], blue[500]]

    return (
        <div>
            <Card raised={true}>
                <CardHeader
                    avatar={
                        <Avatar sx={{backgroundColor: bg[Math.floor((Math.random() * 4))]}}>
                            {note.Category[0].toUpperCase()}
                        </Avatar>}
                    action={
                        <IconButton onClick={() => handleDelete(note.ID)}>
                            <DeleteOutlined />
                        </IconButton>
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