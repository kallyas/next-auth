import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { getSession } from "next-auth/react";

export default function Home({ session, data }) {
  return (
    <div className="container">
      <div className="row">
        {data.map((item) => (
          <div className="col-md-4" key={item.id}>
            <Link href={`/details/${item.id}`} as={`/details/${item.id}`} passHref>
              <div className="card" style={{ cursor: "pointer"}}>
                <div className="card-body" style={{ alignItems: "center" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                  />
                  <h5 className="card-title">{item.title}</h5>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary w-100">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const dataRes = await fetch("https://fakestoreapi.com/products");
  const data = await dataRes.json();
  //if no session, redirect to sign in
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
      data,
    },
  };
}
