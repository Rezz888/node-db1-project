exports.checkAccountPayload = () => {
  // DO YOUR MAGIC
  return (req, res, next)=> {
    if (!req.body.name || !req.body.budget){
      res.status(400).json({
        message: "name and budget are required",
      })
    } else {
      if (typeof req.body.name !== "string"){
        res.status(400).json({
          message: "name of account must be a string"
        })
      }
      else if (100 < ((req.body.name).trim()) || ((req.body.name).trim()) < 3) {
        return res.status(400).json({
          message: "name of account must be between 3 and 100"
        })
      }
      else if (typeof req.body.budget !== "number") {
        return res.status(400).json({
          message: "budget of account must be a number"
        })
      }
      else if (1000000 < (req.body.budget) || (req.body.budget) < 0) {
        return res.status(400).json({
          message: "budget of account is too large or too small"
        })
      } else {
        next()
      }
    }
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
 try {
  let dbAccounts = await accounts.getAll()
  // console.log(dbAccounts[0])
  const name = (req.body.name).trim()
  
  dbAccounts = dbAccounts.filter((accountName) => {

    return name === accountName.name
  })
    console.log(dbAccounts)

  if (dbAccounts.length >= 1) {
    res.status(400).json({
      message: "that name is taken",
    })
  } else {
  next()
  }
 } catch (err) {
   next(err)
 }
  
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await accounts.getById(req.params.id)
    if (account) {
      req.account = account
      next()
    } else {
      res.status(404).json({
        message: "account not found",
      })
    }
  } catch (err) {
    next(err)
  }
}