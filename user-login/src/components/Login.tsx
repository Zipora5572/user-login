import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { FormEvent, useContext, useState } from 'react';
import '../styles.css';
import { initialState, UserContext } from "../User"
import LoginIcon from '@mui/icons-material/Login';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { login, register } from '../useAPI';
import UserProfile from './UserProfile';

const Login = () => {

    const [isSignUp, setIsSignUp] = useState(true);

    const { user, userDispatch } = useContext(UserContext);


    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState(initialState);

    const handleOpen = (isSignUp: boolean) => {
        setIsSignUp(isSignUp);
        setOpen(true);
    }
    const handleClose = () => {
        if (user !== initialState) {
            navigate('/home');
        }
        setFormData(initialState);
        setOpen(false);
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const handleSignUp = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const result = await register(formData);
            if (result) {

                userDispatch({ type: 'REGISTER', data: {...formData,id:result.userId} });
            }
        } catch (error) {
            console.error('Registration failed', error);
        }

        handleClose();
    };

    const handleSignIn = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const result = await login(formData);
            if (result) {
                userDispatch({ type: 'LOGIN', data: result.user });
            }
        } catch (error) {
            console.error('Login failed', error);
        }
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

            {user != initialState && <h1>a</h1> && <UserProfile />}
            {/* sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', position: 'absolute', top: 0, left: 0, padding: 2 }} */}
            {user == initialState && <Box >

                <Button className='button outlined' sx={{ textTransform: 'none' }} onClick={() => handleOpen(false)} endIcon={<LoginIcon />}>
                    Sign In
                </Button>
                <Button className='button outlined' sx={{ textTransform: 'none' }} onClick={() => handleOpen(true)} endIcon={<LoginIcon />}>
                    Sign Up
                </Button>
            </Box>}


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box className='box'>
                    <Typography id="modal-title" variant="h6" component="h2">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Typography>

                    <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
                        <TextField
                            name='email'
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            type="email"
                            margin="normal"
                            value={formData.email}
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
                        <Typography>
                            {isSignUp ? 'Already have an account?' : 'Dont an account?'}
                            <Button onClick={() => setIsSignUp(!isSignUp)} sx={{ textTransform: 'none' }}>
                                {isSignUp ? 'Sign in' : 'sign up'}
                            </Button>
                        </Typography>
                        <Button onClick={handleClose} variant="outlined" color="primary" sx={{ textTransform: 'none' }}>
                            Close
                        </Button>
                        <Button type="submit" variant="contained" sx={{ textTransform: 'none' }}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>

                    </form>


                </Box>
            </Modal>
        </>
    );
};

export default Login;
