const express = require("express")
const zod = require('zod')
const jwt = require("jsonwebtoken")
const { User, Account } = require("../db")
const { JWT_SECRET } = require("../config")
const { authMiddleware } = require("../middleware")
const router = express.Router()


function validateSingup(obj){
    const signupBody = zod.object({
        username:zod.string().email(),
        firstName:zod.string(),
        lastName:zod.string(),
        password:zod.string().min(8)
    })

    const respone = signupBody.safeParse(obj)
    return respone

}

function validateSignin(obj){
    const signinBody = zod.object({
        username:zod.string().email(),
        password:zod.string().min(8)
    })

    const respone = signinBody.safeParse(obj)
    return respone
}


function validateNewBody(obj){
    const updateBody = zod.object({
        firstName:zod.string(),
        lastName:zod.string(),
        password:zod.string().min(8)
    })

    const respone = updateBody.safeParse(obj)
    return respone
}
    


router.post('/signup',async (req,res)=>{

    const {success} = validateSingup(req.body)

    if(!success){
        return res.status(411).json({
            msg:"Incorrect inputs"
        })
    }


    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
       return  res.status(411).json({
            msg:"Email already taken"
        })
    }
    
    try{
        const user = await User.create({
            username:req.body.username,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:req.body.password
        })

        const userId = user._id

        await Account.create({
            userId,
            balance:1+Math.random()*100000
        })

     jwt.sign({userId},JWT_SECRET,{},(err,token)=>{
        if(err) throw err;
        res.status(200).json({
            msg:"User Created Successfullly",
            token
        })
    })
}
catch(error){
    res.status(500).json({
        msg:"Internal server error"
    })
}

})


router.post('/signin', async(req,res)=>{

    const {success} = validateSignin(req.body)

    if(!success){
        return res.status(411).json({
            msg:"Incorrect Username or Password"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    try {

        if(!user){
            return res.status(411).json({
                msg:"Incorrect Username or Password"
            })
        }
        
        const userId = user._id
        jwt.sign({userId},JWT_SECRET,{},(err,token)=>{
            if(err) throw err;
            res.status(200).json({
                token
            })
        })   
        return
    } catch (error) {
        return res.status(411).json({
            msg:"Error while logging in"
        })
    }
})

router.put('/',authMiddleware,async(req,res)=>{
    const {success} = validateNewBody(req.body)

    if(!success){
        return res.status(411).json({
            msg:"Incorrect Firstname , Lastname or Password"
        })
    }

    try {

        await User.updateOne({_id:req.userId},req.body)
        res.status(200).json({
            msg:"User Updated Successfully"
        })
        
    } catch (error) {
        res.status(411).json({
            msg:'Error while Updating information'
        })
    }
})

router.get('/bulk',authMiddleware,async(req,res)=>{
try {
    const filter = req.query.filter
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
    
} catch (error) {
    res.status(500).json({ msg: "Error fetching users" });  
}
})

router.get('/profile',authMiddleware,async(req,res)=>{
try{
    const user = await User.findOne({_id:req.userId})

    res.status(200).json(user) 
}
catch(err){
    res.status(411).json({
        msg:'user not found'
    })
}


})

module.exports=router
