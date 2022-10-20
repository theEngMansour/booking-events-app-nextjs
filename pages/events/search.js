import React from "react";
import Head from "next/head";
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { AuthContext } from "contexts";
import { Paper, Typography, Button, Box } from "@mui/material";
import { useQuery } from "@apollo/client";
import { SEARCH } from "hooks/queries";
import { useRouter } from "next/router";
import { Loading } from "components";

export default function Search() {
  const router = useRouter();
  const { query } = useRouter();
  const { userId } = useContext(AuthContext);

  const { loading, error, data } = useQuery(SEARCH, {
    variables: {
      contains: query.q,
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;

  return (
    <React.Fragment>
      <Head>
        <title>{query.q}</title>
      </Head>
      <Box sx={{ flexGrow: 1 }} className="p-2">
        <Button
          onClick={() => router.push("/events")}
          className="font-b mx-2 bg-app my-2 md:mr-8"
          variant="contained"
        >
          الرجوع
        </Button>
        <Typography
          className="text-right text-app my-4 p-0 font-b md:mr-8"
          variant="h4"
        >
          {query.q}
        </Typography>
        <Grid container spacing={2}>
          {data.search.map(
            ({
              id,
              title,
              description,
              price,
              date,
              username,
              __typename,
              creatorId,
            }) => (
              <Grid key={id} xs={12} md={3}>
                <Paper
                  elevation={0}
                  className="border-2 border-app p-0 m-0 h-52 flex justify-center items-center flex-col select-none"
                  square
                >
                  {__typename == "Event" ? (
                    <>
                      <Typography
                        className="text-right m-0 p-1 px-2 font-b bg-green-600 text-white"
                        variant="body"
                      >
                        الإحداث
                      </Typography>
                      <Typography
                        className="text-center text-app m-0 p-0 font-b"
                        variant="h4"
                      >
                        {title.substr(0, 15)}
                      </Typography>
                      <Typography className="text-center text-gray-800 m-0 p-0 font-r">
                        {description.substr(0, 30)}
                      </Typography>
                      <Typography className="text-center text-gray-700 m-0 p-0 font-bold text-sm mt-4 font-b">
                        {date} -
                        <span className="text-app font-bold font-b">
                          ${price}
                        </span>
                      </Typography>
                      <Link
                        href={{
                          pathname: "/events/[id]",
                          query: { id: id },
                        }}
                        passHref
                      >
                        <Button
                          className="mt-4 mb-2 bg-app font-b m"
                          variant="contained"
                        >
                          {userId === creatorId
                            ? "أنت صاحب هذه المناسبة"
                            : "عرض التفاصيل"}
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Typography
                        className="text-right m-0 p-1 px-2 font-b bg-green-600 text-white"
                        variant="body"
                      >
                        المستخدمين
                      </Typography>
                      <Typography
                        className="text-center text-app m-0 p-0 font-b"
                        variant="h4"
                      >
                        {username}
                      </Typography>
                    </>
                  )}
                </Paper>
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
