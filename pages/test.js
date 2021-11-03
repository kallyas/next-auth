import { getSession } from "next-auth/react";

const Test = ({ session }) => {
  if (session) {
    return <h2>This page was renderd on server after session check</h2>;
  }

  return <h3>Oooops! looks like you are not logged in!</h3>;
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default Test;
