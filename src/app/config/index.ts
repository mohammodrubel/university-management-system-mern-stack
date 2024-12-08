import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  port: process.env.PORT,
  database_url: process.env.MONGODB_CONNECTION,
  default__password:process.env.DEAFULT__PASSWORD,
  node__Env:process.env.NODE__ENV
}
