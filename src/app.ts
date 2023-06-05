import express, { Request, Response } from 'express'
import cors from 'cors'
import { Application } from 'express-serve-static-core'

const app: Application = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('hello world')
})

export default app
