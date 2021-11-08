import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cartSelector } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  reduceQuantity,
  increaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const { cart, totalPrice } = useSelector(cartSelector);
  console.log({ cart, totalPrice, reduceQuantity, increaseQuantity });
  const dispatch = useDispatch();
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckoutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({cart}),
    });

    const {session} = await checkoutSession.json();
    const sessionId = session.id;
    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      console.error(result.error);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="container bg-white rounded-top mt-5" id="zero-pad">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10 col-12 pt-3">
            <div className="d-flex flex-column pt-4">
              <div>
                <h5 className="text-uppercase font-weight-normal">
                  shopping bag
                </h5>
              </div>
              <div className="font-weight-normal">{cart.length} items</div>
            </div>
            <div
              className="d-flex flex-row px-lg-5 mx-lg-5 mobile"
              id="heading"
            >
              <div className="px-lg-5 mr-lg-5" id="produc">
                PRODUCTS
              </div>
              <div className="px-lg-5 ml-lg-5" id="prc">
                PRICE
              </div>
              <div className="px-lg-5 ml-lg-1" id="quantity">
                QUANTITY
              </div>
              <div className="px-lg-5 ml-lg-3" id="total">
                TOTAL
              </div>
            </div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex flex-row justify-content-between align-items-center pt-lg-4 pt-2 pb-3 border-bottom mobile"
              >
                <div className="d-flex flex-row align-items-center">
                  <div>
                    <Image
                      src={item.image}
                      width="100"
                      height="100"
                      alt={item.title}
                    />
                  </div>
                  <div className="d-flex flex-column pl-md-3 pl-1">
                    <div>
                      <h6>{item.title}</h6>
                    </div>
                  </div>
                </div>
                <div className="pl-md-0 pl-1">
                  <b>${item.price}</b>
                </div>
                <div className="pl-md-0 pl-2">
                  <span
                    className="fa fa-minus-square text-secondary"
                    onClick={() => dispatch(reduceQuantity({ product: item }))}
                  ></span>
                  <span className="px-md-3 px-1">{item.quantity}</span>
                  <span
                    className="fa fa-plus-square text-secondary"
                    onClick={() =>
                      dispatch(increaseQuantity({ product: item }))
                    }
                  ></span>
                </div>
                <div className="pl-md-0 pl-1">
                  <b>${(item.price * item.quantity).toFixed(2)}</b>
                </div>
                <div
                  className="close"
                  onClick={() => dispatch(removeFromCart({ data: item }))}
                >
                  &times;
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container bg-light rounded-bottom py-4" id="zero-pad">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link href="/" passHref>
                  <button className="btn btn-sm bg-light border border-dark w-100">
                    GO BACK
                  </button>
                </Link>
              </div>
              <div className="px-md-0 px-1" id="footer-font">
                <b className="pl-md-4">
                  SUBTOTAL{" "}
                  <span className="pl-md-4">${totalPrice.toFixed(2)}</span>
                </b>
              </div>
              <div>
                <button
                  onClick={createCheckoutSession}
                  className="btn btn-sm bg-dark text-white px-lg-5 px-3 w-100"
                >
                  {loading ? "Loading..." : "CHECKOUT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

export async function getServerSideProps(context) {
  const session = await getSession(context);
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
    },
  };
}
