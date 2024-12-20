import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  port: process.env.PORT,
  database_url: process.env.MONGODB_CONNECTION,
  default__password:process.env.DEAFULT__PASSWORD,
  node__Env:process.env.NODE__ENV,
  jwt__access__token__secret :process.env.JWT__ACCESS__TOKEN__SECRET,
  jwt__refresh__toekn__secret:process.env.JWT__REFRESH__TOKEN__SECRET,
  jwt__access__token__expire__in:process.env.JWT__ACCESS__TOKEN__TIME__EXPIRE__IN,
  jwt__refresh__token__expire__in:process.env.JWT__REFRESH__TOKEN__TIME__EXPIRE__IN
}
