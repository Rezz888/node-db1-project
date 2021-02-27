const db = require("../../data/db-config")

const getAll = () => {
   const accounts = db.select("*").from("accounts")
   return accounts
}

const getById = async id => {
  const [account] = await db
  .select("*")
  .from("accounts")
  .where("id", id)
  .limit(1)

  return account
}

const create = async account => {
   const [accountId] = await db
   .insert(account).into("accounts")
   

   const newAccount = await db("accounts")
   .where("id", accountId)
   .first()

   return newAccount

}

const updateById = async (id, account) => {
   
     await db("accounts")
          .update(account)
          .where("id", id)

      const updateAccount = await db("accounts")
       .where("id", id)
       .first()

       return updateAccount;
}

const deleteById = async id => {
    await db("accounts")
          .where("id", id)
          .del()

     return (`account ${id} has been deleted`)
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
