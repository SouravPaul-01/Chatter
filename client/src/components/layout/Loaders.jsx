import { Skeleton, Grid, Box, Stack } from "@mui/material";
import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
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
      <Box
        sx={{
          height: 64,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          bgcolor: "#e57373", // Match your app's header color if needed
        }}
      >
        {/* Left: App Title Skeleton */}
        <Skeleton variant="text" width={100} height={30} />

        {/* Right: Icon Skeletons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant="circular" width={30} height={30} />
          ))}
        </Box>
      </Box>

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Grid container sx={{ height: "100%" }}>
          {/* Sidebar Skeleton - User List */}
          <Grid
            item
            size={{ sm: 4, md: 3 }}
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
            size={{ xs: 12, sm: 8, md: 5, lg: 6 }}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflowY: "auto",
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
            size={{ md: 4, lg: 3 }}
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
      </Box>

      {/* Chat Input Skeleton */}
      {/* <Box
        sx={{
          p: 2,
          bgcolor: "white",
          borderTop: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexShrink: 0,
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
      </Box> */}
    </Box>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={1.5}
      direction="row"
      padding="0.8rem 1.2rem"
      alignItems="center"
      sx={{
        backgroundColor: 'rgba(38, 148, 171, 0.08)',
        borderRadius: '1.5rem 1.5rem 1.5rem 0.25rem',
        width: 'fit-content',
        margin: '0.5rem 0',
        marginLeft: '0.5rem',
        boxShadow: 'none',
        border: 'none',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '-0.5rem',
          backgroundColor: 'rgba(38, 148, 171, 0.08)',
          transform: 'rotate(45deg)',
          transformOrigin: 'bottom right',
          border: 'none'
        }
      }}
    >
      <BouncingSkeleton
        variant="circular"
        width={8}
        height={8}
        sx={{
          animationDelay: '0ms',
          position: 'relative',
          zIndex: 1,
          margin: 0
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={8}
        height={8}
        sx={{
          animationDelay: '200ms',
          position: 'relative',
          zIndex: 1,
          margin: 0
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={8}
        height={8}
        sx={{
          animationDelay: '400ms',
          position: 'relative',
          zIndex: 1,
          margin: 0
        }}
      />
    </Stack>
  );
};

export { LayoutLoader, TypingLoader };
