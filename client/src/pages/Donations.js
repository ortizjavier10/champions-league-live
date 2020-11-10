import React from 'react';
// import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");


// const url = new URL(context.headers.referer).origin;
const sessionID = async function() {
    const product = await stripe.products.create({
        name:"Donation",
        description: "Thank you for donating to the team!"
    })
    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 1000,
        currency: "usd"
    })

    const session = await stripe.checkout.sessions.create({
        payment_methods_type: ['card'],
        line_items: [
            {
                price: price.id,
                quantity: 1,
            }
        ],
        mode: "payment",
        // success_url: `${url}success?session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url: `${url}/`
    })
    console.log(session.id)
}
const Donations = () => {
    return (
      <div>
        <button className="donate-btn" onClick={sessionID}>Donate 👍!</button>
        
      </div>
    );
  };
  
  export default Donations;