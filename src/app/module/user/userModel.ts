import { model, Schema } from "mongoose";
import { TUser } from "./userInterface";
import bcrypt from 'bcrypt'

const UserSchema = new Schema<TUser>({
    id:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    },
    password:{
        type:String,
        required:true
    },
    needPasswordChange:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        enum: ['user' , 'admin' , 'student','faculty'],
    },
    status:{
        type:String,
        enum: ['in-progress','blocked'],
        default:'in-progress'
    },
},{
    timestamps:true
})
UserSchema.pre('save',async function(next){
    const slatRound = 12
    this.password = await bcrypt.hash(this.password,Number(slatRound))
    next()
  })
  
  UserSchema.post('save',function(docs,next){
    docs.password = ""
    next()
  })
  
  

export const User = model<TUser>('User', UserSchema)