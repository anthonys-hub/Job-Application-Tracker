const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const pool = require('./db')
const authRoutes = require('./routes/auth.js')
const authMiddleware = require('./middleware/authMiddleware.js')
const jobs = require('./routes/jobs.js')


const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())


app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobs)

app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running' })
})





pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Database connection failed', err)
    } else {
        console.log('Database connected:', res.rows[0].now)
    }
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})