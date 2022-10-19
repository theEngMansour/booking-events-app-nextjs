import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENT } from "hooks/queries";
import { BOOK_EVENT } from "hooks/mutations";
import { useState, useContext } from "react";
import { AuthContext } from "contexts";
import { useRouter } from "next/router";
import { Button } from "components";

export default function Show() {
  const [alert, setAlert] = useState()
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
      setAlert("تم حجز المناسبة بنجاح")
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{alert}</h1>
      <h1>{data?.getIdEvents?.title}</h1>
      <h5>{data?.getIdEvents?.description}</h5>
      <li>{data?.getIdEvents?.price}</li>
      <li>{data?.getIdEvents?.date}</li>
      <p>{data?.getIdEvents?.creator?.username}</p>
      <Button
        token={token}
        userId={userId}
        creatorId={data?.getIdEvents?.creatorId}
        eventId={data?.getIdEvents?.id}
        bookEventHandler={bookEventHandler}
      />
    </div>
  );
}


