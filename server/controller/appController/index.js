import leadDb from "../../models/appModels/lead.js"
import customerDb  from "../../models/appModels/customer.js"
import create from "./create.js"
import getList from "./getList.js"

const appRoutes = {
    create:async(req,res,next)=>{
     // will update the Data Model based on entity here only
     let db = checkDbForEntity(req.body.entity)
     if(!db) return res.send("failed") // manage Error here
    create(req,res,next,db)
    },
    getList:async (req,res,next)=>{
      console.log(req.body);
      let db = checkDbForEntity(req.body.entity)
      if(!db) return res.send("failed") // manage Error here
      getList(req,res,next,db)
    }
}

const checkDbForEntity =(entity)=>{
  if(entity === "customer"){
    return customerDb
  }else if(entity === "lead"){
    return leadDb
  }else{
    return false
  }
}

export default appRoutes