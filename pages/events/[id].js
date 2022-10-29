import React, { useState, useContext } from "react";
import Head from "next/head";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENT } from "hooks/queries";
import { BOOK_EVENT } from "hooks/mutations";
import { AuthContext } from "contexts";
import { useRouter } from "next/router";
import { Alert, Button, Loading } from "components";
import { Box, Paper, Typography, Button as Btn } from "@mui/material";

export default function Show() {
  const [alert, setAlert] = useState();
  const { token, userId } = useContext(AuthContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: router?.query?.id },
  });

  const [bookEventHandler] = useMutation(BOOK_EVENT, {
    onError: (error) => {
      setAlert(error.message);
    },
    onCompleted: () => {
      setAlert("تم حجز المناسبة بنجاح");
    },
  });

  if (loading) return "Loading";

  return (
    <React.Fragment>
      <Head>
        <title>{data?.getIdEvents?.title}</title>
      </Head>
      <Box sx={{ flexGrow: 1 }} className="p-2">
        <Btn
          onClick={() => router.push("/events")}
          className="font-b mx-2 bg-app my-2 md:mr-8"
          variant="contained"
        >
          الرجوع
        </Btn>
        <Grid container spacing={2}>
          <Grid xs={12} md={12} className="md:flex md:justify-center">
            <Paper
              elevation={0}
              className="border-2 border-app p-0 md:w-[640px] m-0 py-4 px-4 flex justify-center items-center flex-col"
              square
            >
              {alert && (
                <Alert className="font-b w-64 md:w-[80%]" type="success">
                  {alert}
                </Alert>
              )}
              <Typography
                className="text-center m-0 p-0 font-m my-4 text-app w-full"
                variant="h4"
              >
                {data?.getIdEvents?.title}
              </Typography>
              <Typography
                className="text-center m-0 p-0 font-b my-0 text-app w-full"
                variant="h3"
              >
                ${data?.getIdEvents?.price}
              </Typography>
              <Typography
                className="text-center m-0 p-0 font-m my-0 text-gray-600 w-full"
                variant="body"
              >
                {data?.getIdEvents?.date}
              </Typography>
              <Typography
                className="text-center m-0 p-0 font-m my-0 w-full text-blue-700 m-0 p-0 underline"
                variant="body"
              >
                {data?.getIdEvents?.creator?.username}
              </Typography>
              <Typography
                className="text-right m-0 p-0 font-m my-4 text-gray-600 w-full"
                variant="body"
              >
                {data?.getIdEvents?.description}
              </Typography>
              <Button
                token={token}
                userId={userId}
                creatorId={data?.getIdEvents?.creatorId}
                eventId={data?.getIdEvents?.id}
                bookEventHandler={bookEventHandler}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <br></br>
    </React.Fragment>
  );
}
