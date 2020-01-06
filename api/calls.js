import bodyParser from 'body-parser'

let app = require('express')()

app.use(bodyParser.json())


app.post('/pay', async function (req, res, next) {
//   if(!req.body || !req.body.data ) {
//     res.json({
//       msg: false
//     })
//   }

  try {
    // var data = await strapi.updateEntry('recipes', req.body.recipeId, {
    //   cuisines : req.body.data
    // })
      res.json({status:true})
  } catch(err) {
    next(err)
  }
})


export default {
  handler: app,
  path: '/api'
}
