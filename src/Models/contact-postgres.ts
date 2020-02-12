import connect,{sql} from '@databases/pg'
import dotenv from 'dotenv'
dotenv.config()
//by default databases uses the process.env.database_url 
//as the connection string
const db = connect();
const authenticate = () => {
    console.log('connecting to postgres ....')
    db.query(sql`Select * from contacts`)
    console.log("connected to postgres :)")
}

export  {db,sql,authenticate}