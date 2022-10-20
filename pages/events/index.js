import Head from "next/head";
import Grid from "@mui/material/Unstable_Grid2";
import { useState, useContext } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { EVENTS } from "hooks/queries";
import { AuthContext } from "contexts";
import { Event, Create, Search, Pagination, Loading } from "components";
import { Box } from "@mui/material";

export default function Index() {
  const [page, setPage] = useState(1);
  const { token } = useContext(AuthContext);
  
  // pagination
  const PAGE_SIZE = 8;
  const SKIP = PAGE_SIZE * (page - 1);

  // get events
  const { loading, error, data } = useQuery(EVENTS, {
    variables: {
      limit: PAGE_SIZE,
      offset: SKIP,
    },
  });

  // refetch queries after create events
  const client = useApolloClient();
  client.refetchQueries({
    include: ["Events"],
  });

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <Head>
        <title>الإحداث</title>
      </Head>
      <Search />
      {token && <Create />}
      <Box sx={{ flexGrow: 1 }} className="p-2">
        <Grid container spacing={2}>
          <Event data={data} />
        </Grid>
      </Box>
      <Pagination page={page} onChange={setPage} />
    </div>
  );
}
