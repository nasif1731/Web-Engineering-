const express = require('express');
const mysql = require('mysql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'items_db'
});

mysqlConnection.connect(err => {
    if (err) {
        console.error('MySQL Connection Error:', err);
        process.exit(1);
    } else {
        console.log('MySQL Connected');
    }
});

mongoose.connect('mongodb://localhost:27017/items_db')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

const Item = mongoose.model('Item', ItemSchema);

app.post('/api/items', async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    const sql = 'INSERT INTO items (name, description, price, stock) VALUES (?, ?, ?, ?)';
    mysqlConnection.query(sql, [name, description, price, stock], async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        try {
            const newItem = new Item({ name, price, category });
            await newItem.save();
            res.json({ message: 'Item inserted into MySQL & MongoDB' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
});

app.get('/api/items/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('SELECT * FROM items WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Item not found in MySQL' });

        const mysqlItem = result[0];
        Item.findOne({ name: mysqlItem.name })
            .then(mongoItem => {
                if (!mongoItem) return res.status(404).json({ message: 'Item not found in MongoDB' });
                res.json({ mysql: mysqlItem, mongo: mongoItem });
            })
            .catch(err => res.status(500).json({ error: err.message }));
    });
});


app.get('/api/items', async (req, res) => {
    mysqlConnection.query('SELECT * FROM items', async (err, mysqlItems) => {
        if (err) return res.status(500).json({ error: err.message });

        try {
            const mongoItems = await Item.find();
            res.json({ mysql: mysqlItems, mongo: mongoItems });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
});

app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    mysqlConnection.query('SELECT name FROM items WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Item not found in MySQL' });

        const oldName = result[0].name;
        const sql = 'UPDATE items SET name=?, description=?, price=?, stock=? WHERE id=?';
        mysqlConnection.query(sql, [name, description, price, stock, id], (err) => {
            if (err) return res.status(500).json({ error: err.message });

            Item.findOneAndUpdate({ name: oldName }, { name, price, category }, { new: true })
                .then(updatedItem => {
                    if (!updatedItem) return res.status(404).json({ message: 'Item not found in MongoDB' });
                    res.json({ message: 'Item updated in MySQL & MongoDB', updatedItem });
                })
                .catch(err => res.status(500).json({ error: err.message }));
        });
    });
});

app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('SELECT name FROM items WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Item not found in MySQL' });

        const itemName = result[0].name;
        mysqlConnection.query('DELETE FROM items WHERE id = ?', [id], async (err) => {
            if (err) return res.status(500).json({ error: err.message });

            try {
                await Item.findOneAndDelete({ name: itemName });
                res.json({ message: 'Item deleted from MySQL & MongoDB' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));