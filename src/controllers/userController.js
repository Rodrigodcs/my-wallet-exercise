import {signUpUser, verifyEmail, verifyAuthenticity, createToken} from "../services/userService.js"
import bcrypt from "bcrypt";

async function signUp(req,res){
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.sendStatus(400);
        }

        if(await verifyEmail(email)){
            return res.sendStatus(409);
        }

        await signUpUser(name,email,password)

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function signIn(req,res){
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.sendStatus(400);
      }
  
      const user= await verifyEmail(email)
  
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.sendStatus(401);
      }
  
      const token = createToken(user)

      res.send({
        token
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }



export {signUp, signIn}