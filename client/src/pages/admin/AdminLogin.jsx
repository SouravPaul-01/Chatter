import React, { useEffect } from "react";
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
import { useInputValidation } from "6pp";
import { loginBgColorGradient } from "../../constants/color";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const secretKey = useInputValidation("");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };
  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

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
          <Typography variant="h5">Admin Login</Typography>

          <form onSubmit={submitHandler}>
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="Password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
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
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
