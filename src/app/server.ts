import app from './app'
import mongoose from 'mongoose'
import config from './config'

async function main() {
  try {
    mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
