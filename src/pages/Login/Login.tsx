import { Box, Paper, Typography } from "@mui/material";
import styles from "./Login.module.css";
import loginBanner from "../../../public/images/clgloginbanner.png";
import loginLogo from "../../../public/images/loginlogo.png";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Grid from '@mui/material/Grid';
import { useAuthStore } from "../../store/useAuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "./validationSchema";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuthStore();
    console.log("login", login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    const handleLogin = async () => {
        try {
            setError("");
            setFieldErrors({});

            await loginValidationSchema.validate(
                { email, password },
                { abortEarly: false }
            );

            await login({ email, password });
            navigate("/home");

        } catch (err: any) {
            if (err.inner) {
                const errors: any = {};
                err.inner.forEach((e: any) => {
                    errors[e.path] = e.message;
                });
                setFieldErrors(errors);
            } else {
                setError(err.message || "Login failed");
            }
        }
    };


    return (
        <Box className={styles.page}
            sx={{
                backgroundImage: `url(${loginBanner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                p: 4,
            }}>
            <Paper elevation={5} sx={{ width: { xs: "90%", sm: 400 }, padding: '40px 40px', borderRadius: 2, mt: 14, ml: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={loginLogo} alt="Login Logo" style={{ width: 120, height: 120 }} />
                </Box>
                <Typography variant="h5" gutterBottom textAlign={'center'} marginBottom={6}> Student Management System </Typography>
                {error && (
                    <Typography color="error" sx={{ mb: 2, textAlign: 'center', fontSize: '0.9rem' }}>
                        {error}
                    </Typography>
                )}
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(value: string) => setEmail(value)}
                            error={!!fieldErrors.email}
                            helperText={fieldErrors.email}
                        />
                    </Grid>
                    <Grid xs={12} mt={2}>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(value: string) => setPassword(value)}
                            error={!!fieldErrors.password}
                            helperText={fieldErrors.password}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} mt={3}>
                    <Grid xs={12}>
                        <Button label="Log In" buttonType="primary" type="submit" onClick={handleLogin} />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Login;
