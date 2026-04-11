const express = require('express')
const router = express.Router()
const pool = require('../db')
const authMiddleware = require('../middleware/authMiddleware.js')


router.get('/', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jobs WHERE user_id = $1', [req.user.id])
        const jobs = result.rows
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No jobs!' })
        }
        else {
            return res.status(200).json(jobs)
        }
    }

    catch {
        return res.status(500).json({ message: 'Server error' });
    }

}
)

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { company, position, status, date_applied, notes } = req.body
        const newJob = await pool.query('INSERT INTO jobs (user_id, company, position, status, date_applied, notes) VALUES ($1, $2, $3, $4, $5, $6)', [req.user.id, company, position, status, date_applied, notes])
        return res.status(201).json({ message: 'Job added! :)' })

    }

    catch {
        return res.status(500).json({ message: 'Server error' });
    }

}
)

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { company, position, status, date_applied, notes } = req.body
        const jobId = req.params.id
        const edit = await pool.query('UPDATE jobs SET company = $1, position = $2, notes = $3, status = $4, date_applied = $5 WHERE jobId = $6 AND req.user.id = $7', [req.user.id, company, position, status, date_applied, notes])
        return res.status(200).json({ message: 'Successfully edited! :)' });
    }


    catch {
        return res.status(500).json({ message: 'Server error' });
    }
})




module.exports = router