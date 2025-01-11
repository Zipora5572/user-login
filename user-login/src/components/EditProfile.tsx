

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { FormEvent, useContext, useEffect, useState } from 'react';
import '../styles.css';
import { initialState, UserContext } from "../User"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { update } from '../useAPI';

const EditProfile = () => {

    
    const { user, userDispatch } = useContext(UserContext);
    
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const [open, setOpen] = useState(true);

    const initialValue = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
    }

    const [formData, setFormData] = useState(initialValue);

    useEffect(() => {

        if (user !== initialState) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                address: user.address || '',
                phoneNumber: user.phoneNumber || '',
                password: ''
            });
        }
    }, [user]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if (user !== initialState) {
            navigate('/home');
        }
        setFormData(initialValue);
        setOpen(false);
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    
    const handleSubmit = async(event: FormEvent) => {
        event.preventDefault();
        try {
            const result = await update(formData); // Call the async function
            if (result) {
                userDispatch({ type: 'UPDATE', data: formData }); // Dispatch action with result
            }
        } catch (error) {
            console.error('Update failed', error);
        }
        navigate(-1);
        handleClose();
    };

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box className='box'>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Edit Profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name='firstName'
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            name='lastName'
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.lastName}
                            onChange={handleChange}

                        />
                        <TextField
                            name='email'
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            margin="normal"
                            value={formData.email}
                            onChange={handleChange}

                        />
                        <TextField
                            name='address'
                            label="Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.address}
                            onChange={handleChange}

                        />
                        <TextField
                            name='phoneNumber'
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.phoneNumber}
                            onChange={handleChange}

                        />
                        <TextField
                            name='password'
                            label="Password"
                            // type="password"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </Button>
                                )
                            }}
                            type={showPassword ? "text" : "password"}



                        />
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                        <Button onClick={handleClose} variant="outlined" color="primary">
                            Close
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
export default EditProfile