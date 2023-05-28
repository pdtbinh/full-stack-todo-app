import React from 'react'
import { ErrorProps } from '../../types/types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import './errorStyle.css'

const Error: React.FC<ErrorProps> = ({ message, openError, children }) => {
    return (
        <div className='Error'>
            <Dialog open={openError} keepMounted>
                <DialogTitle><b>An error has occured:</b></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        { message }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    { children }
                </DialogActions> 
            </Dialog>
        </div>
    )
};

export default Error


  