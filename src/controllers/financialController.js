import jwt from "jsonwebtoken";
import connection from "../database.js";
import {verifyData} from "../services/financialService.js"
import {createEntry} from "../repositories/financialRepository.js"

async function financialEvents(req,res) {
    try {
      const authorization = req.headers.authorization || "";
      const token = authorization.split('Bearer ')[1];
  
      if (!token) {
        return res.sendStatus(401);
      }
  
      let user;
  
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch {
        return res.sendStatus(401);
      }
  
      const { value, type } = req.body;
  
      if (verifyData(value,type)) {
        return res.sendStatus(400);
      }
  
      //await create(user.id,value,type)
      await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [user.id, value, type]
      );
  
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
}

export {financialEvents}