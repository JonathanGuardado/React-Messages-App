import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { MessageProps } from '../../../lib/types'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { MessagesContext } from '../../../contexts/MessagesContexts';

const useStyles = makeStyles({
    messageCard: {
        marginBottom: '15px'
    },
    content: {
        minHeight: '45px'
    },
    warningVariant: {
        background: '#FCE788'
    },
    errorVariant: {
        background: '#F56236'
    },
    infoVariant: {
        background: '#88FCA3'
    },
    clearCardLink: {
        marginLeft: 'auto'
    },
    actions: {
        padding: "0 15px 10px 0"
    },
    message: {
        fontSize: 14
    }

});

const Message = ({ children: message, variant }: MessageProps) => {
    const { deleteMessage } = useContext(MessagesContext)
    const classes = useStyles();
    let messageVariant = classes.infoVariant
    if (variant === "error") {
        messageVariant = classes.errorVariant
    } else if (variant === "warning") {
        messageVariant = classes.warningVariant
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Card className={`${classes.messageCard} ${messageVariant}`}>
                <CardContent className={classes.content}>
                    <Typography className={classes.message} gutterBottom>
                        {message.message}
                    </Typography>

                </CardContent>
                <CardActions className={classes.actions}>
                    <Link href="#" data-testid="delete-card" color="inherit" className={classes.clearCardLink} onClick={() => deleteMessage(message)} >Clear</Link>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Message;