import express from 'express'
import cors from 'cors'
import courseRoutes from './routes/courses.js'

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())
app.use('/api/courses', courseRoutes)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
