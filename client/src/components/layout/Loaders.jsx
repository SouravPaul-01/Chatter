import { Skeleton, Grid, Box, Avatar } from "@mui/material";

export const LayoutLoader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Skeleton */}
      <Skeleton variant="rectangular" height={64} width="100%" />

      <Grid container sx={{ flexGrow: 1, width: "100%" }}>
        {/* Sidebar Skeleton - User List */}
        <Grid
          item
          sm={4}
          md={3}
          sx={{
            display: { xs: "none", sm: "block" },
            bgcolor: "#f0f0f0",
            p: 2,
            height: "100%",
          }}
        >
          {[...Array(10)].map((_, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ mr: 2 }}
              />
              <Box sx={{ width: "100%" }}>
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="60%" height={15} />
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Chat Window Skeleton - Message History */}
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={6}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {[...Array(12)].map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              }}
            >
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ mx: 2 }}
              />
              <Skeleton
                variant="rectangular"
                height={50}
                width={index % 2 === 0 ? "70%" : "50%"}
                sx={{ borderRadius: 2 }}
              />
            </Box>
          ))}
        </Grid>

        {/* Right Sidebar Skeleton - User Details & Notifications */}
        <Grid
          item
          md={3}
          lg={3}
          sx={{
            display: { xs: "none", md: "block" },
            p: 2,
            bgcolor: "#f0f0f0",
            height: "100%",
          }}
        >
          {/* User Details */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Skeleton
              variant="circular"
              width={50}
              height={50}
              sx={{ mr: 2 }}
            />
            <Box>
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={150} height={15} />
            </Box>
          </Box>

          {/* Notifications */}
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={60}
              width="100%"
              sx={{ mb: 2, borderRadius: 1 }}
            />
          ))}
        </Grid>
      </Grid>

      {/* Chat Input Skeleton */}
      <Box
        sx={{
          p: 2,
          bgcolor: "white",
          borderTop: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Skeleton
          variant="rectangular"
          height={50}
          width="100%"
          sx={{ borderRadius: 2 }}
        />
        <Skeleton variant="circular" width={40} height={40} sx={{ ml: 2 }} />
      </Box>
    </Box>
  );
};
