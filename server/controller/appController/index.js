import leadDb from "../../models/appModels/lead.js"
import customerDb  from "../../models/appModels/customer.js"
import create from "./create.js"

const appRoutes = {
    create:async(req,res,next)=>{
     // will update the Data Model based on entity here only
     let db = checkDbForEntity(req.body.entity)
     
     if(!db) return res.send("failed")
    create(req,res,next,db)
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