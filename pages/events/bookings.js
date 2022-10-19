import React, { useState } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { BOOKINGS } from "hooks/queries";
import { CANCEL_BOOKING } from "hooks/mutations";
import { Booking, Alert, Loading } from "components";

export default function Bookings() {
  const [alert, setAlert] = useState();
  const { loading, error, data } = useQuery(BOOKINGS);

  const [cancelBooking] = useMutation(CANCEL_BOOKING, {
    onError: (error) => setAlert(error.message),
    onCompleted: () => {
      setAlert("تم إلغاء حجزك");
    },
  });

  // refetch queries after create events
  const client = useApolloClient();
  client.refetchQueries({
    include: ["Bookings"],
  });

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;

  return (
    <React.Fragment>
      {alert && (
        <Alert className="font-b" type="success">
          {alert}
        </Alert>
      )}
      <Booking data={data} cancelBooking={cancelBooking} />
    </React.Fragment>
  );
}
