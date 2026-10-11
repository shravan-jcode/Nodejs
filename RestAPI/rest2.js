
const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 3000;

const filePath = path.join(__dirname, 'users.json');

app.use(express.json());

// Read existing JSON data
async function readUsers() {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

// Write updated JSON data
async function writeUsers(users) {
    await fs.writeFile(
        filePath,
        JSON.stringify(users, null, 2)
    );
}

// GET: Retrieve all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await readUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to read users' });
    }
});

// GET: Retrieve one user
app.get('/api/users/:id', async (req, res) => {
    try {
        const users = await readUsers();
        const user = users.find(
            u => u.id === Number(req.params.id)
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to read user' });
    }
});

// POST: Add a new user
app.post('/api/users', async (req, res) => {
    try {
        const users = await readUsers();
        const { name, age } = req.body;

        if (typeof name !== 'string' || !name.trim() ||
            !Number.isFinite(age)) {
            return res.status(400).json({
                message: 'Valid name and age are required'
            });
        }

        const newId = users.reduce(
            (max, u) => Math.max(max, u.id), 0
        ) + 1;

        const newUser = {
            id: newId,
            name: name.trim(),
            age
        };

        users.push(newUser);
        await writeUsers(users);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// PUT: Replace a user's data
app.put('/api/users/:id', async (req, res) => {
    try {
        const users = await readUsers();
        const id = Number(req.params.id);

        const index = users.findIndex(u => u.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, age } = req.body;

        if (typeof name !== 'string' || !name.trim() ||
            !Number.isFinite(age)) {
            return res.status(400).json({
                message: 'Valid name and age are required'
            });
        }

        users[index] = {
            id,
            name: name.trim(),
            age
        };

        await writeUsers(users);
        res.json(users[index]);
    } catch (error) {
        res.status(500).json({ message: 'Failed to replace user' });
    }
});

// PATCH: Update only the provided fields
app.patch('/api/users/:id', async (req, res) => {
    try {
        const users = await readUsers();
        const id = Number(req.params.id);

        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, age } = req.body;

        if (
            (name !== undefined &&
                (typeof name !== 'string' || !name.trim())) ||
            (age !== undefined && !Number.isFinite(age)) ||
            (name === undefined && age === undefined)
        ) {
            return res.status(400).json({
                message: 'Provide a valid name or age'
            });
        }

        if (name !== undefined) user.name = name.trim();
        if (age !== undefined) user.age = age;

        await writeUsers(users);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user' });
    }
});

// DELETE: Remove a user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const users = await readUsers();
        const id = Number(req.params.id);

        const index = users.findIndex(u => u.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        const deletedUser = users.splice(index, 1)[0];

        await writeUsers(users);
        res.json({
            message: 'User deleted successfully',
            user: deletedUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
