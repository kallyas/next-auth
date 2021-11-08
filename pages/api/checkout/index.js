const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { getSession } from 'next-auth/react'

export default async function CreateStripeSession(req, res) {
  const { cart, user } = req.body;
  const userSession = await getSession({ req });
  console.log({userSession, cart});

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.map(item => ({
        name: item.title,
        description: item.description,
        images: [item.image],
        amount: item.price * 100,
        currency: 'usd',
        quantity: item.quantity
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`
    });

    res.status(200).json({
      status: 'success',
      session
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
}