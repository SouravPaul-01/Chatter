import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/validators";
import { loginBgColorGradient } from "../components/constants/color";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();

  const avatar = useFileHandler("single");

  const handleSingUp = (e) => {
    e.preventDefault();
  };
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        backgroundImage: loginBgColorGradient,
        minHeight: "100vh",
      }}
      /*
      More background options:--> 
      1️⃣ Elegant Blue Gradient (Soft & Professional):

      style={{
      backgroundImage: "linear-gradient(to right, #56ccf2, #2f80ed)",
      minHeight: "100vh",
      }}

    2️⃣ Peach & Purple Glow (Trendy & Modern)

    style={{
    backgroundImage: "linear-gradient(to right, #ff9a9e, #fad0c4)",
    minHeight: "100vh",
    }}

      */
    >
      <Container
        component={"main"}
        maxWidth="sx"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
            maxWidth: 500,
            margin: "auto",
            justifySelf: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>

              <form onSubmit={handleLogin}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="Password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Login
                </Button>
                <Typography align="center" sx={{ marginTop: ".8rem" }}>
                  Or
                </Typography>

                <Button
                  fullWidth
                  variant="text"
                  color="primary"
                  sx={{ marginTop: ".8rem" }}
                  onClick={toggleLogin}
                >
                  Sing UP
                </Button>
              </form>
            </>
          ) : (
            /*///! Register Part Starts Here ///*/
            <>
              <Typography variant="h5">Sing Up</Typography>

              <form onSubmit={handleSingUp}>
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="Password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Sing UP
                </Button>
                <Typography align="center" sx={{ marginTop: ".8rem" }}>
                  OR
                </Typography>

                <Button
                  fullWidth
                  variant="text"
                  color="primary"
                  sx={{ marginTop: ".8rem" }}
                  onClick={toggleLogin}
                >
                  Sing In
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
