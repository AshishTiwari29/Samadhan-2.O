const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const students = [
    { id: 1, name: 'Ashish', age: 17, grade: '12', email: 'ashish@example.com' },
    { id: 2, name: 'Manish', age: 16, grade: '11', email: 'manish@example.com' },
    { id: 3, name: 'K. Aditya', age: 17, grade: '12', email: 'k.aditya@example.com' },
    { id: 4, name: 'Pratima', age: 15, grade: '10', email: 'pratima@example.com' },
    { id: 5, name: 'Riya', age: 16, grade: '11', email: 'riya@example.com' },

];

app.get('/students', (req, res) => {
    try {
        let results = students.slice();

        
        const { search, page = 1, limit = 10 } = req.query;
        if (search) {
            const q = String(search).toLowerCase();
            results = results.filter(s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q));
        }

        
        const p = Math.max(1, parseInt(page, 10) || 1);
        const l = Math.max(1, parseInt(limit, 10) || 10);
        const start = (p - 1) * l;
        const paged = results.slice(start, start + l);

        res.json({
            total: results.length,
            page: p,
            limit: l,
            data: paged
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Student API running on http://localhost:${PORT}`);
});