require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

async function postCharge(req, res) {
  try {
    const { amount, source, receipt_email, title, address, customerName } = req.body;

    const { data } = await stripe.customers.list({ email: receipt_email });
    const customer = data.length ? data.find((c) => c.email === receipt_email) : null;

    let nCustomer;
    if (customer && customer.id) {
      nCustomer = await stripe.customers.update(customer.id, {
        default_source: customer.default_source,
      });
    } else {
      nCustomer = await stripe.customers.create({
        email: receipt_email,
        source,
        name: customerName,
        address,cd
      });
    }

    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source,
      receipt_email,
      description: `Product: ${title}`,
      customer: nCustomer.id,
    });

    if (!charge) throw new Error('charge unsuccessful');

    res.status(200).json({
      message: 'charge posted successfully',
      charge,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = postCharge;
