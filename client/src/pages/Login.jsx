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
import { loginBgColorGradient } from "../constants/color";
import { server } from "../constants/config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  // const handleSingUp = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("name", name.value);
  //   formData.append("bio", bio.value);
  //   formData.append("username", username.value);
  //   formData.append("password", password.value);
  //   formData.append("avatar", avatar.value);

  //   const config = {
  //     withCredentials: true,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };

  //   try {
  //     const { data } = await axios.post(
  //       `${server}/api/v1/user/new`,
  //       formData,
  //       config
  //     );
  //     dispatch(userExists(true));
  //     toast.success(data.message);
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || "Something went wrong");
  //   }
  // };

  const handleSingUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Logging in...");

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
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
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Typography align="center" sx={{ marginTop: ".8rem" }}>
                  Or
                </Typography>

                <Button
                  fullWidth
                  disabled={isLoading}
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
                  disabled={isLoading}
                >
                  Sing UP
                </Button>
                <Typography align="center" sx={{ marginTop: ".8rem" }}>
                  OR
                </Typography>

                <Button
                  fullWidth
                  disabled={isLoading}
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
