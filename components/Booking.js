import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/router";
import { Box, Paper, Typography, Button } from "@mui/material";

export default function Booking({ data, cancelBooking }) {
  const router = useRouter();
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }} className="p-2">
        <Button
          onClick={() => router.push("/events")}
          className="font-b mx-2 bg-app my-2 md:mr-8"
          variant="contained"
        >
          الرجوع
        </Button>
        <Grid container spacing={2}>
          <Typography
            className="text-center m-0 p-0 font-m my-4 text-app w-full"
            variant="h4"
          >
            المناسبات التي حجزتها
          </Typography>
          {data.bookings.map((booking) => (
            <Grid
              key={booking.id}
              xs={12}
              md={12}
              className="md:flex md:justify-center"
            >
              <Paper
                elevation={0}
                className="border-2 border-app p-0 md:w-[840px] m-0 h-[50px] flex justify-start items-center justify-between"
                square
              >
                <Typography
                  className="text-app m-0 p-0 font-b mr-4"
                  variant="h6"
                >
                  {booking.event.title.substr(0, 15)}
                </Typography>
                <Button
                  onClick={() =>
                    cancelBooking({ variables: { bookingId: booking.id } })
                  }
                  className="font-b mx-2 bg-red-600"
                  variant="contained"
                >
                  إلغاء
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
