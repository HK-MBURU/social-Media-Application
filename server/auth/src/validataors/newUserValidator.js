const {newUserSchema}=require('../Schema/userSchema')

function newUserValidator(body){
    
        let user= newUserSchema.validate(body,{abortEarly:false})

        if(user.error?.details.length){
            let message=user.error.details.map(err=>err.message)
            throw new Error(message.join("\n"))
        }else{
            return user
        }
          
    
}

module.exports={newUserValidator}