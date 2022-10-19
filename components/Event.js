import React from "react";
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { AuthContext } from "contexts";
import { Paper, Typography, Button } from "@mui/material";

export default function Event({ data }) {
  const { userId } = useContext(AuthContext);
  return (
    <React.Fragment>
      {data.events.map(
        ({ id, title, description, price, date, creatorId, creator }) => (
          <Grid key={id} xs={12} md={3}>
            <Paper
              elevation={0}
              className="border-2 border-app p-0 m-0 h-52 flex justify-center items-center flex-col select-none"
              square
            >
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
                <span className="text-app font-bold font-b">${price}</span>
              </Typography>
              <Typography className="text-center text-blue-700 m-0 p-0 font-bold text-sm font-b underline">
                {creator.username}
              </Typography>
              <Link
                href={{
                  pathname: "/events/[id]",
                  query: { id: id },
                }}
                passHref
              >
                <Button className="mt-4 mb-2 bg-app font-b m" variant="contained">
                  {userId === creatorId
                    ? "أنت صاحب هذه المناسبة"
                    : "عرض التفاصيل"}
                </Button>
              </Link>
            </Paper>
          </Grid>
        )
      )}
    </React.Fragment>
  );
}
