import connection from "../database.js";

async function find(email){
    const user = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
    )
    return user.rows[0]
}

async function create(name,email,hashedPassword){
    const result = await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
    );
    return result.rows[0]
}

async function create(){
    const entry = await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [user.id, value, type]
    );
    return entry;
}

export {find, create}