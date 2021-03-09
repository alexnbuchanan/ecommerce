import React, { useState } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import {
  Elements,
  CardElement,
  ElementsConsumer,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import { getTotal } from '../../helpers/helperTools';


import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ shippingData, backStep, nextStep, setQty }) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const storageItems = JSON.parse(localStorage.getItem('product'));
    const products = storageItems || [];

    const totalPrice = getTotal(products);
    let productTitle = '';

    products.map((item, index) => {
      productTitle = `${productTitle} | ${item.title}`;
    });

    const cardElement = elements.getElement(CardElement);
    // Instead of token we need to attach source here
    // because source has more payments options available
    const { error, source } = await stripe.createSource(cardElement);
    console.log(error, source);
    const order = await axios.post('http://localhost:7000/api/stripe/charge', {
      amount: totalPrice * 100,
      source: source.id,
      receipt_email: shippingData.email,
      title: productTitle,
      customerName: `${shippingData.firstName} ${shippingData.lastName}`,
      address: {
        city: shippingData.City,
        country: shippingData.shippingCountry,
        line1: shippingData.address1,
        postal_code: shippingData.ZIP,
        state: shippingData.shippingState,
      },
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', order);
      localStorage.setItem('product', JSON.stringify([]));
      nextStep();
      setQty({quantity: 0});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='outlined' onClick={backStep}>
          Back
        </Button>
        <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
          Pay
        </Button>
      </div>
    </form>
  );
};

function PaymentForm({ shippingData, backStep, nextStep, setQty }) {
  return (
    <Elements stripe={stripePromise}>
      <Review />
      <br />
      <br />
      <CheckoutForm shippingData={shippingData} nextStep={nextStep} backStep={backStep} setQty={setQty} />
    </Elements>
  );
}

export default PaymentForm;
