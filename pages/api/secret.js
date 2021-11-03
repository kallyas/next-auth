import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    res.send({ message: "logged In!" });
  } else {
    res.send({ error: "not authenticated" });
  }
}
