const accounts = require("./accounts-model")

const router = require('express').Router()

router.get('/', async (req, res, next) => {
    try {
     const allAccounts = await accounts.getAll()
       res.json(allAccounts)
      
    } catch(err){
      next(err)
    }
})

router.get('/api/accounts/:id', async(req, res, next) => {
   try{ 
     const account = await accounts.getById(req.params.id)
         res.json(account)
   } catch(err){
     next(err)
   }
})

router.post('/api/accounts', async(req, res, next) => {
  try{
    const account = await accounts.create({
      name: req.body.name,
      budget: req.body.budget
    })
    res.status(201).json(account)
    
  } catch(err){
    next(err)
  }
})

router.put('/api/accounts/:id', async (req, res, next) => {
  try {
     const newUpdate = await accounts.updateById(req.params.id, req.body)
      res.json(newUpdate);

  } catch(err){
     next(err);
  }
});

router.delete('/api/accounts/:id', async(req, res, next) => {
   try{
      await accounts.deleteById(req.params.id)
        res.status(204).end()
   } catch(err){
     next(err)
   }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
