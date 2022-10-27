import Image from "next/future/image";
import { Paper, Typography, Box, Grid } from "@mui/material";

export default function Future() {
  return (
    <Paper
      elevation={0}
      className="bg-app-light md:w-[872px] md:h-[472px] w-full my-4 md:pb-0 pb-8"
    >
      <br></br>
      <br></br>
      <Typography
        className="text-center text-app m-0 p-0 font-b text-3xl"
        variant="h4"
      >
        إهم مميزات البرنامج
      </Typography>
      <Typography className="text-center font-r text-white" variant="h6">
        إهم مايميز برنامجنا عن غيرة
      </Typography>
      <Grid className="flex justify-center items-center md:flex-row flex-col mt-14">
        <Grid item xs={12} md={4}>
          <div className="bg-white w-40 h-40 rounded-full text-center flex justify-center items-center">
            <Image
              src="/icons/speed.png"
              width={90}
              height={90}
              alt="speed icon"
            />
          </div>
          <h1 className="text-center text-2xl font-b text-white my-4">سرعة</h1>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="bg-white w-40 h-40 rounded-full text-center md:mx-2 md:my-0 my-2 flex justify-center items-center">
            <Image
              src="/icons/simple.png"
              width={80}
              height={80}
              alt="simple icon"
            />
          </div>
          <h1 className="text-center text-2xl font-b text-white my-4">بساطة</h1>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="bg-white w-40 h-40 rounded-full text-center flex justify-center items-center">
            <Image
              src="/icons/prot.png"
              width={80}
              height={80}
              alt="pro icon"
            />
          </div>
          <h1 className="text-center text-2xl font-b text-white my-4">أمان</h1>
        </Grid>
      </Grid>
    </Paper>
  );
}
