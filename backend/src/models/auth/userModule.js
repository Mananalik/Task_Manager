import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please provide your name"],
    },
    email:{
        type:String,
        required: [true,"Please provide your email"],
        unique: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please provide a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"], 
    },
    photo:{
        type:String,
        default: "https://avatars.githubusercontent.com/u/19819005?v=4",
    },
    bio:{
        type: String,
        default: "I am a new user.",
    },
    role:{
        type:String,
        enum:["user","admin","creator"],
        default:"user",
    },
    isVerified:{
        type:Boolean,
        default:false,
    },

    },
    {timestamps: true, minimize:false}
);
// hash the password before saving
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
      return  next();
    }
    // hash the password ==> bcrypt
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password,salt);
    // set the password two hashedPassword
    this.password = hashedPassword;
    // call the next middleware
    next();
});
const User = mongoose.model("User",UserSchema);
export default User;