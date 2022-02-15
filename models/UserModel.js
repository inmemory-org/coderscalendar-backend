import mongoose from 'mongoose'
const { Schema } = mongoose;
const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model('user', UserSchema)