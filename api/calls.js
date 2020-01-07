const stripe = require('stripe')('sk_test_ybuTn2aPgn94GZmjM3oLIDQE00gyuTFMCJ');
import bodyParser from 'body-parser'


let app = require('express')()

app.use(bodyParser.json())

app.post('/pay', async function (req, res, next) {
  // console.log('\n req params to pay:', req.body)
  // if(!req.body ||  !req.body.token || !req.body.amount ) {
  //   res.json({
  //     msg: false
  //   })
  // }
  var token = null;
  token = req.body.token;
  try {
    var result = await stripe.charges.create({
      // Transform cents to dollars.
      amount: parseFloat(req.body.amount, 100) * 100,
      currency: 'usd',
      description: `Payment ${new Date()} by Neel`,
      source: token,
    });
    console.log('result:', result.status)
    console.log('receipt_url:', result.receipt_url)
    if (result && result.status == "succeeded" && result.receipt_url) {
      var resData = { status: "200", receipt_url: result.receipt_url }
      console.log('success:')
      res.json(resData)
    } else {
      res.json({status:false})
    }
  } catch (err) {
    next(err)
  }
})

export default {
  handler: app,
  path: '/api'
}