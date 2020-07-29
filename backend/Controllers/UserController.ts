import { Request, Response } from 'express';
import db from '../Database/db';
import bcrypt from 'bcrypt';

class UserController {
    public async LoginUser (req: Request, res: Response) : Promise<void> {
        console.log(`[REQUEST LOGIN] [USERNAME] = ${req.body.username} [PASSWORD] = ${req.body.password}`)
        db.query(`SELECT * FROM users_accounts WHERE username = '${req.body.username}'`, (error, results, fields) => {
            if (results) {
                if (results[0]) {
                    // console.log("compare sync")
                    if ( bcrypt.compareSync(req.body.password, results[0].password) ) {
                        return res.status(200).send({
                            loginAccount: true
                        })
                    } else {
                        return res.status(200).send({
                            loginAccount: false
                        })
                    }
                } else {
                    return res.status(200).send({
                        loginAccount: false
                    })
                }
            } else {
                return res.status(200).send({
                    loginAccount: false
                })
            }
        })
    }

    public async RegisterUser (req : Request, res : Response) : Promise<void> {
        // req.body < = 
        db.query(`SELECT * FROM users_accounts WHERE username = '${req.body.username}'`, (error, results, fields) => {
            // [ conta1, conta2 ]
            if ( results ) {
                if ( results[0] ) {
                    res.status(200).send({
                        createdAccount: false,
                        reason: "Username já em uso"
                    })
                } else {
                    const hashed_password = bcrypt.hashSync(req.body.password, 10);
                    console.log(`[REGISTER_ACCOUNT_SUCESS] => USERNAME = ${req.body.username}`);
                    db.query(`INSERT INTO users_accounts (username, password) VALUES ('${req.body.username}', '${hashed_password}')`);
                    res.status(200).send({
                        createdAccount: true
                    });
                }
            } else {
                res.status(200).send({
                    createdAccount: false,
                    reason: "Username já em uso"
                })
            } 
        })
    }
}

export default new UserController();