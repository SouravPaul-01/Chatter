import React, { useState, useEffect } from "react";
import { Container, Stack, Typography, Button, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const NotFound = () => {
  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch('/assets/bear-hanging.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAnimationData(data);
        setLoading(false);
      } catch (e) {
        console.error("Failed to load animation data:", e);
        setError(true);
        setLoading(false);
      }
    };

    fetchAnimation();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `radial-gradient(#795548 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <Stack
          alignItems="center"
          spacing={4}
          justifyContent="center"
          position="relative"
          sx={{ zIndex: 1 }}
        >
          {/* Bear Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: animationData ? 1 : 0.8, opacity: animationData ? 1 : 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ width: 400, height: 400 }}
          >
            {loading && <CircularProgress color="inherit" />}
            {error && <Typography color="error">Failed to load animation.</Typography>}
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </motion.div>

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "6rem", md: "8rem" },
                fontWeight: 700,
                background: "linear-gradient(45deg, #795548, #5D4037)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              404
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#5D4037",
                fontWeight: 500,
                textAlign: "center",
                mb: 4,
              }}
            >
              Oops! Looks like we're hanging around...
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #795548 30%, #5D4037 90%)",
                color: "white",
                padding: "12px 30px",
                borderRadius: "30px",
                textTransform: "none",
                fontSize: "1.1rem",
                boxShadow: "0 3px 5px 2px rgba(121, 85, 72, .3)",
                "&:hover": {
                  background: "linear-gradient(45deg, #6D4C41 30%, #4E342E 90%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 5px 8px 2px rgba(121, 85, 72, .4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Let's Get Back Home
            </Button>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
};

export default NotFound;
