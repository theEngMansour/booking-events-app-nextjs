import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import PropTypes from "prop-types";
import { Box, Paper, CircularProgress, Typography } from "@mui/material";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size={120} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          className="font-b text-app text-3xl"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function Loading() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }} className="p-2">
        <Grid container spacing={2}>
          <Grid xs={12} md={12} className="md:flex md:justify-center">
            <Paper
              elevation={0}
              className="p-0 md:w-[440px] m-0 h-44 flex justify-center items-center flex-col"
              square
            >
              <CircularProgressWithLabel value={progress} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
