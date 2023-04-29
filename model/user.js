import { Schema, models, model } from "mongoose";

const useSchema = new Schema({
    name:String,
    avatar:String,
    email:String,
    salary:Number,
    date:String,
    status:String
});

const Users = models.user || model('user',useSchema);

export default Users;