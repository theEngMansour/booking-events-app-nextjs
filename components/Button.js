import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

export default function ButtonApp({
  token,
  userId,
  creatorId,
  eventId,
  bookEventHandler,
}) {
  return (
    <React.Fragment>
      {token ? (
        creatorId == userId ? (
          <Button
            disabled
            className="mt-4 mb-2 bg-app font-b mb-4"
            variant="contained"
          >
            مناسبتي
          </Button>
        ) : (
          <Button
            onClick={() => bookEventHandler({ variables: { eventId } })}
            className="mt-4 mb-2 bg-app font-b mb-4"
            variant="contained"
          >
            احجز
          </Button>
        )
      ) : (
        <Link href={"/login"} passHref>
          <Button
            disabled
            className="mt-4 mb-2 bg-app font-b mb-4"
            variant="contained"
          >
            سجل دخول لتحجز
          </Button>
        </Link>
      )}
    </React.Fragment>
  );
}
