import Link from "next/link";
import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH } from "hooks/queries";
import { AuthContext } from "contexts";
import { useRouter } from "next/router";
import { Loading } from "components";

export default function Index() {
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
    <div>
      {data.search.map(({ id, title, price, date, username, __typename, creatorId}) => (
        <div key={id}>
          <h1>{__typename}</h1>
          <h3>{title}</h3>
          <b>About this location:</b>
          <p>{price}</p>
          <p>{date}</p>
          <Link href={`/events/${id}`} passHref>
            <button className="btn mt-4 bg-blue-200">
              {userId === creatorId ? "أنت صاحب هذه المناسبة" : "عرض التفاصيل"}
            </button>
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
}
