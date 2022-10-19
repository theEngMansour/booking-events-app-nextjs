import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { Box, Paper, Typography, Button } from "@mui/material";

export default function Create() {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }} className="p-2">
        <Grid container spacing={2}>
          <Grid xs={12} md={12} className="md:flex md:justify-center">
            <Paper
              elevation={0}
              className="border-2 border-app p-0 md:w-[440px] m-0 h-44 flex justify-center items-center flex-col"
              square
            >
              <Typography
                className="text-center text-app m-0 p-0 font-b"
                variant="h4"
              >
                شارك مناسباتك الخاصة!
              </Typography>
              <Link href={"/events/create"} passHref>
                <Button className="mt-4 bg-app font-b" variant="contained">
                  إنشاء مناسبة
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Typography className="text-center m-0 p-0 font-m my-4 text-gray-700" variant="h4">
        المناسبات من حولك!
      </Typography>
    </React.Fragment>
  );
}
