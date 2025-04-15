const express=require('express');
const bcrypt=require('bcrypt');
const _session=require('express-session');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const users=require('./users');
const app=express();
app.use(express.json());

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );
}
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(usr => usr.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch=bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user);
    return res.status(200).json({message: 'Login successful', token: token });
});
app.post('/profile', (req, res) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    // const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({message: 'Profile data', user: decoded });
    }catch(err){
        return res.status(401).json({ message: 'Invalid token' });

    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

    