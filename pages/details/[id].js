import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice"

const Details = ({ data }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const reduceQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    }
  useEffect(() => {
    if (!session) {
      return router.push("/signin");
    }
  }, [router, session]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <Image src={data.image} alt={data.title} height={400} width={300} />
        </div>
        <div className="col-md-6">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <p>${data.price}</p>
          <div className="row">
            <div className="col-md-4 mr-5">
              <span onClick={increaseQuantity}>
                <i
                  className="fas fa-plus"
                  style={{ fontSize: "x-large", cursor: "pointer" }}
                ></i>
              </span>
              <span style={{ fontSize: "x-large" }}>{quantity}</span>
              <span onClick={reduceQuantity}>
                <i
                  className="fas fa-minus"
                  style={{ fontSize: "x-large", cursor: "pointer" }}
                ></i>
              </span>
            </div>
          </div>
          <button className="btn btn-primary"
          onClick={() => dispatch(addToCart({ data, quantity }))}
          >Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Details;

export async function getStaticProps(context) {
  const id = context.params.id;
  const product = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await product.json();
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const products = await fetch("https://fakestoreapi.com/products");
  const productsData = await products.json();
  const paths = productsData.map((product) => ({
    params: { id: product.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}
