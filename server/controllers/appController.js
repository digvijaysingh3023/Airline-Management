const UserModel = require('../model/User.model')
const bcrypt = require('bcrypt')

async function register(req, res) {
    try {
        const {username,password,profile,email} = req.body

        //check existing user
        const existUsername = await UserModel.findOne({
            username,
            function(err, user) {
              if (err) reject(new Error(err));
              if (user) reject({ error: "Please use unique username" });
            },
          });
        //check existing email
        const existEmail = await UserModel.findOne({
            email,
            function(err, email) {
              if (err) reject(new Error(err));
              if (email) reject({ error: "Please use unique email" });
            },
          });
                if(password){
                    bcrypt.hash(password,10)
                        .then(hashedPassord => {

                            const user = new UserModel({
                                username,
                                password:hashedPassord,
                                profile:profile || '',
                                email,
                            });

                            user.save()
                                .then(result => res.status(201).send({ msg : "User Register Successfull"}))
                                .catch(error=> res.status(500).send({error}))

                        }).catch(error=>{
                            return res.status(500).send({
                                error:"Enable to hash password"
                            })
                        })
                }
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function login(req, res) {
    res.json('login route')
}

async function getUser(req, res) {
    res.json('getUser route')
}

async function updateUser(req, res) {
    res.json('updateUser route')
}

async function generateOTP(req, res) {
    res.json('generateOTP route')
}


async function verifyOTP(req, res) {
    res.json('verifyOTP route')
}

async function createResetSession(req, res) {
    res.json('createResetSession route')
}

async function resetPassword(req, res) {
    res.json('resetPassword route')
}


module.exports = { login, register, getUser, generateOTP, verifyOTP, createResetSession, updateUser, resetPassword }