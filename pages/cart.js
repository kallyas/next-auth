// create a cart page
// only logged in users can access this page
// the cart page is a list of all the items in the cart
// the user can add or remove items from the cart
// the user can also checkout
// the user can also go back to the home page

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { cartSelector } from "../features/cart/cartSlice"

const Cart = () => {
    const { data: session } = useSession()
    const { cart, total } = useSelector(cartSelector)
    console.log({ cart, total });
    const router = useRouter()

    useEffect(() => {
        if (!session) {
            router.push('/signin')
        }
    }, [router, session])
    return (
        <div>
            <h1>Cart</h1>
            <p>This is the cart page</p>
        </div>
    )
}

export default Cart
