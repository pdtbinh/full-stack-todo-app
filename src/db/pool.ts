import { Pool, Client } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const pool = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    user: 'lexppvljwytmxz',
    password: process.env.DB_PASSWORD,
    host: 'ec2-52-209-225-31.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'deju3dm4r6hpjh',
})

pool.connect((err) => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
})

export default pool