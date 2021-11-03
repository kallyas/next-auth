import * as jwt from "next-auth/jwt";

const secret = process.env.SECRET;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const token = await jwt.getToken({ req, secret });
  res.send(JSON.stringify(token, undefined, 2));
};
