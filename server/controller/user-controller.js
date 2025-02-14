const bcryptjs = require("bcryptjs");
const Topsel_User = require("../model/user-model");
const generateToken = require("../utils/generateToken");
const SignupUser = async (req, res) => {
  const { fullName, email, password, username, gender, country, dateOfBirth } =
    req.body;
  try {
    //check if any field is empty
    if (!fullName || !email || !password || !username || !gender || !country || !dateOfBirth) {
        return res.status(400).json({ message: "All fields are required" });
      }      
    //check if user is already exist
    const userExist = await Topsel_User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already registered" });
    }
    //hased the password
    const HashedPassword = bcryptjs.hashSync(password, 10);
    //creating a user instancse
    const newUser = new Topsel_User({
      fullName,
      email,
      username,
      gender,
      country,
      dateOfBirth,
      password: HashedPassword,
    });
    //save the user in database
    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const SignIn= async(req,res)=>{
    const{email, password}= req.body
    try {
        //check if email or password is not filled
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
          }
          //find the user from database with email
          const user= await Topsel_User.findOne({email})
          //check is no user found with that email and show error if not found
          if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
          }
          //check if the password is same or not provided by user and with database passowrd
          const isMatch= bcryptjs.compareSync(password,user.password)
          //return error or show resposne of if passowrd is not matched with databse password
          if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password" });
          }
          const token = generateToken(user._id);
          res.status(200).json({
            success: true,
            message: "User Logged in successfully",
            token,
            user: {
              _id: user._id,
              username: user.username,
              email: user.email,
              fullName: user.fullName,
              gender: user.gender,
              dob: user.dateOfBirth,
              country: user.country,
            }
          });
          
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" }); 
    }
}
const userSearch = async (req, res) => {
    try {
      console.log("Authenticated user:", req.user);
        console.log('function called')
        //get data from url after ? using req.query
      const { username } = req.query;
  
      if (!username) {
        return res.status(400).json({ success: false, message: "Provide username or email" });
      }
      
  //find based one user input 
      const user = await Topsel_User.findOne({ 
        $or: [
          { username: { $regex: username, $options: "i" } }, 
        ]
      });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({ success: true, user });
    } catch (error) {
        console.log('the error is', error.message)
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
module.exports={SignupUser, SignIn, userSearch}