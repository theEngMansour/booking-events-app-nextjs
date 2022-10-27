import Head from "next/head";
import Image from "next/future/image";
import { Future } from "components";
import { Paper, Typography, Box, Grid } from "@mui/material";

export default function Home() {
  return (
    <div className="bg-app">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Box className="p-0 m-0 flex justify-center items-center flex-col select-none">
        <Future />
      </Box>
    </div>
  );
}
