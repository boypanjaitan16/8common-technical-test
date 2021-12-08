import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import ReplyIcon from '@mui/icons-material/Reply';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface Contact {
    name?: string, 
    email: string
}

interface Message {
    id: string,
    dateTimeCreated: number,
    from: Contact,
    to: Array<Contact>,
    cc: Array<Contact>,
    contentPreview: string,
    content: string
}

interface Props {
    message : Message,
    defaultExpanded: boolean,
    onReply     : (message:Message) => void,
    onReplyAll  : (message:Message) => void,
    onForward   : (message:Message) => void
    onDiscard   : (message:Message) => void,
    onEscalate  : (message:Message) => void
}

const CustomPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.subtitle1,
    color: theme.palette.text.secondary
}));

export default function EmailMessageCard({defaultExpanded, message, onReply, onReplyAll, onForward, onEscalate, onDiscard}:Props){
    const anchorRef = useRef<HTMLDivElement>(null);

    const [openPopper, setOpenPopper]   = useState<boolean>(false);
    const [expanded, setExpanded]       = useState<boolean>(defaultExpanded)

    useEffect(() => {
        setExpanded(defaultExpanded)
    }, [defaultExpanded])

    useEffect(() => {
        if(!expanded) setOpenPopper(false)
    }, [expanded])

    if(!expanded){
        return (
            <CustomPaper sx={{cursor: 'pointer'}} onClick={() => setExpanded(true)}>
                <Box sx={{ flexGrow: 1, py: 2, px: 3, }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <Typography variant='h6' sx={{color: 'black', fontWeight: '600'}}>
                                {message.to.map(t => t.name ?? t.email).join('; ')}
                            </Typography>
                            <Typography variant='subtitle2'>
                                {message.contentPreview}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{display:'flex', justifyContent: 'center', flexDirection: 'column'}}>
                            <Typography variant='subtitle1' align='right'>
                                {moment(new Date(message.dateTimeCreated)).format('ddd DD/MM/yyyy H:m A')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </CustomPaper>
        )
    }

    return (
        <CustomPaper>
            <Box sx={{ flexGrow: 1, py: 2, px: 3, }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} sx={{cursor: 'pointer'}} onClick={() => setExpanded(false)}>
                        <Typography variant='h6' sx={{color: 'black', fontWeight: '600'}}>
                            {message.from.name ? `${message.from.name} (${message.from.email})` : message.from.email}
                        </Typography>
                        <Typography variant='subtitle2'>
                            {moment(new Date(message.dateTimeCreated)).format('ddd DD/MM/yyyy H:m A')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{display:'flex', alignItems: 'end', flexDirection: 'column'}}>
                        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                            <Button onClick={() => onReply(message)} startIcon={<ReplyIcon/>}>Reply</Button>
                            <Button
                                size="small"
                                aria-controls={openPopper ? 'split-button-menu' : undefined}
                                aria-expanded={openPopper ? 'true' : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={() => setOpenPopper(old => !old)}>
                                <MoreHorizIcon />
                            </Button>
                        </ButtonGroup>
                        <Popper
                            open={openPopper}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal>
                            {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper sx={{ width: 145, mt: 1}}>
                                <ClickAwayListener onClickAway={() => setOpenPopper(false)}>
                                    <MenuList id="split-button-menu">
                                        <MenuItem onClick={() => onReplyAll(message)}>
                                            <ListItemIcon>
                                                <ReplyAllIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Reply All</ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={() => onForward(message)}>
                                            <ListItemIcon>
                                                <ForwardOutlinedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Forward</ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={() => onEscalate(message)}>
                                            <ListItemIcon>
                                                <DoubleArrowIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Escalate</ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={() => onDiscard(message)}>
                                            <ListItemIcon>
                                                <DoDisturbIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Discard</ListItemText>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
                        </Popper>
                    </Grid>
                </Grid>
                <div className='flex items-start space-x-2'>
                    <b>To</b>
                    <p>
                        {message.to.map((to, i) => (
                            <span key={to.email}>{to.name ? `${to.name} (${to.email})`: to.email}{i < (message.to.length -1) && '; '}</span>
                        ))}
                    </p>
                </div>
                {message.cc.length > 0 && (
                    <div className='flex items-start space-x-2'>
                        <b>Cc</b>
                        <p>
                            {message.cc.map((cc, i) => (
                                <span key={cc.email}>{cc.name ? `${cc.name} (${cc.email})`: cc.email}{i < (message.cc.length -1) && '; '}</span>
                            ))}
                        </p>
                    </div>
                )}
                
                <div className='mt-3' dangerouslySetInnerHTML={{__html: message.content}}></div>
            </Box>
        </CustomPaper>
    )
}