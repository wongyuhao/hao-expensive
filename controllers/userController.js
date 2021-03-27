const {User} = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success:true,
      count:users.length,
      data:users
    });
  } catch (err) {
    return res.status(500).json({
      success:false,
      error: 'Server Error'
    })
  }
}

exports.registerUser = async (req, res) => {
  try {
  const {email, password, passwordCheck, username} = req.body;
  
  if(!email || !password || !passwordCheck) {
    return res.status(400).json({
      sucess:false,
      error: "Incomplete fields"
    })
  }

  if(password.length< 5){
    return res.status(400).json({
      sucess:false,
      error: "Password must be longer than 5 characters"
    })
  }

  
  await User.exists({email: email},
      async (err, userExists) =>{
        if(err) throw err;

        if(userExists){
          return res.status(400).json({
            sucess:false,
            error: "Email already exists"
          })
        } else if(password !== passwordCheck){
          return res.status(400).json({
            sucess:false,
            error: "Passwords must match."
          })
        } else {
          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(password, salt)
          const user = await User.create(
            {...req.body, 
              password: passwordHash,
              username: username ? username : email
            });
  
          return res.status(201).json({
            sucess:true,
            data: user
          })
        }
  });
      
  } catch (err) {

    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success:false,
        error: messages
      })
    }else{
      return res.status(500).json({
        success:false,
        error: 'Server '
      })
    }


  }

}


exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if(!user){
      return res.status(404).json({
        success:false,
        error: "No such user found"
      })
    }

    await user.remove();

    return res.status(200).json({
      success: true,
      data:{}
    })
  } catch (err) {
    return res.status(500).json({
      success:false,
      error: 'Server Error'
    })
  }
}

exports.loginUser = async (req, res) =>{
  try {
    const {email, password} = req.body;
    if(!email || !password ) {
      return res.status(400).json({
        success:false,
        error: "Incomplete fields"
      })
    }

    const user = await User.findOne({email: email});
    if(!user) {
      return res.status(404).json({
        success:false,
        error: "E-mail not found"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(400).json({
        success: false,
        error: "invalid credentials"
      })
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({
      success:true,
      token,
      user:{
        email: user.email,
        username: user.username,
        id: user._id
      }
    })
  } catch (err) {
    
  }
}

exports.tokenIsValid = async(req, res) =>{
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.delete = async(req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getUser = async(req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
  });
}

