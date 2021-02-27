import React, { useState } from 'react';
import {Typography, Button, Divider} from '@material-ui/core';
import {Elements, CardElement, ElementsConsumer, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';

import Review from './Review';

const stripePromise = loadStripe('pk_test_51IIpDBDhRieDnekpNQKifP6DUbpo0IDdqyrO9fzTX0xwPNhjahlTxLfVRXkMBUsSIffBcGdrz4KSySANd6ozSUMM00E6jtTqGV');

const CheckoutForm = ({backStep}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    const order = await axios.post('http://localhost:7000/api/stripe/charge', {
      amount: 200,
      source: token.id,
      receipt_email: 'customer@example.com',
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', order);
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
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Button variant="outlined" onClick={backStep}>Back</Button>
        <Button type="submit" variant="contained" disabled={!stripe} color="primary">
          Pay
        </Button>
      </div>
    </form>
  );
};

function PaymentForm({backStep}) {
  return (
      <Elements stripe={stripePromise}>
        <Review />
        <br /><br />
        <CheckoutForm />
      </Elements>
  );
}

export default PaymentForm;
