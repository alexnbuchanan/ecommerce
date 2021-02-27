const stripe = require('stripe')('sk_test_51IIpDBDhRieDnekpjaUVsfGT6H17pDM4YdJkvbRb3bGcxB4s2f5EZkMtV6sK0osG5XN2Fjpn1EcxWWeLb54vbUam00KtQKUDjB')

async function postCharge(req, res) {
  try {
    const { amount, source, receipt_email } = req.body

    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source,
      receipt_email
    })

    if (!charge) throw new Error('charge unsuccessful')

    res.status(200).json({
      message: 'charge posted successfully',
      charge
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = postCharge
