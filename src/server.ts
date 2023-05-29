import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Successfully Connected!')

    app.listen(config.port, () => {
      console.log('Server is running on port ', config.port)
    })
  } catch (err) {
    console.log('Failed to connect!', err)
  }
}

main()
