import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

console.log(`*************${process.env.DB_PASSWORD}*****************`)

const pool = new Pool({
    user: 'lexppvljwytmxz',
    password: process.env.DB_PASSWORD,
    host: 'ec2-52-209-225-31.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'deju3dm4r6hpjh',
})

export default pool