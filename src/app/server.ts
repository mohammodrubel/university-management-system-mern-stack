import app from './app'
import mongoose from 'mongoose'
import config from './config'
import { Server } from 'http'

let server:Server

async function main() {
  try {
    mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled promise rejection detected. Shutting down the server...');
  
  if (server) {
    server.close(() => {
      console.log('Server closed.');
      process.exit(1); 
    });
  } else {
    process.exit(1); 
  }
});

process.on('uncaughtException',()=>{
  console.log('uncaughtException is detected. Shutting down the server...');
  process.exit(1)
})

