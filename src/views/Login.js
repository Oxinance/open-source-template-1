import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {styled} from "@mui/material/styles";
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react";
import useAuth from "../hooks/useAuth";
import {Navigate} from "react-router-dom";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: "#5b52fc",
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: "#5b52fc",
        },
    },
})

const CssFormControl = styled(FormControl)({
    '& label.Mui-focused': {
        color: "#5b52fc",
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: "#5b52fc",
        },
    },
})

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Login() {


    const [displayPassword, setDisplayPassword] = useState(false);
    const [isLoading, setLoading] = useState(false)
    const { isAuthenticated, login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        await login(data.get("email"), data.get("password"));
    };

    if (isAuthenticated) return <Navigate replace to={"/"}/>

    return (
            <Container sx={{backgroundColor: "white", boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.10)", paddingTop: 1, paddingBottom: 1, marginTop: 20, borderRadius: 1}} maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <svg className="ProductIcon ProductIcon--Payments ProductNav__icon" width="40" height="40" viewBox="0 0 40 40"
                                 fill="none" xmlns="http://www.w3.org/2000/svg"><title>Payments logo</title><path
                                d="M34.61 11.28a2.56 2.56 0 0 0-1.22-1.04L8.54.2A2.57 2.57 0 0 0 5 2.6V15c0 1.05.64 2 1.61 2.4l6.44 2.6 21.56 8.72c.26-.4.4-.88.39-1.36V12.64c0-.48-.13-.96-.39-1.37z"
                                fill="url(#product-icon-payments-ProductNav-a)">
                            </path><path
                                d="M34.63 11.28L13.06 20l-6.45 2.6A2.58 2.58 0 0 0 5 25v12.42a2.58 2.58 0 0 0 3.54 2.39L33.4 29.76c.5-.21.93-.57 1.21-1.04.26-.41.4-.88.39-1.36V12.64c0-.48-.12-.95-.37-1.36z"
                                fill="#96F"></path><path
                                d="M34.62 11.28l.1.17c.18.37.28.77.28 1.19v-.03 14.75c0 .48-.13.95-.39 1.36L13.06 20l21.56-8.72z"
                                fill="url(#product-icon-payments-ProductNav-b)"></path><defs><linearGradient id="product-icon-payments-ProductNav-a"
                                                                                                             x1="20" y1="4.13" x2="20" y2="21.13"
                                                                                                             gradientUnits="userSpaceOnUse"><stop
                                stopColor="#11EFE3"></stop><stop offset="1" stopColor="#21CFE0"></stop></linearGradient><linearGradient
                                id="product-icon-payments-ProductNav-b" x1="35" y1="11.28" x2="35" y2="28.72" gradientUnits="userSpaceOnUse"><stop
                                stopColor="#0048E5"></stop><stop offset="1" stopColor="#9B66FF"></stop></linearGradient></defs></svg>
                        </div>
                        <Typography style={{fontFamily: "Poppins"}} component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <CssTextField
                                disabled={isLoading}
                                margin="normal"
                                fullWidth
                                id="email"
                                label={<p>Email or Username</p>}
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <CssFormControl disabled={isLoading} fullWidth margin="normal" variant="outlined">
                                <InputLabel style={{fontFamily: "Poppins"}} htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name="password"
                                    label={<p>Password</p>}
                                    type={displayPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    endAdornment={
                                        <InputAdornment style={{marginRight: 10}} position="end">
                                            <IconButton
                                                onClick={() => setDisplayPassword(() => !displayPassword)}
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                                {displayPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </CssFormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label={<p>I agree with terms and services.</p>}
                            />
                            <Button
                                disabled={isLoading}
                                type="submit"
                                sx={{ mt: 1, mb: 2}}
                                style={{fontFamily: 'Poppins', backgroundColor: "#5b52fc"}}
                                variant="contained"
                                size="small"
                                fullWidth
                            >
                                <p>Sign In</p>
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 2, fontFamily: "Poppins" }} />
            </Container>
    );
}