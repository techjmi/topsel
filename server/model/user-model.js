const mongoose= require('mongoose')
//creating the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
      },
      fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
      },
      gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["Male", "Female", "Other"],
      },
      dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});
//creating the model
const Topsel_User= mongoose.model('Topsel_User', userSchema)
// export default mongoose.model("User", userSchema);
module.exports= Topsel_User
