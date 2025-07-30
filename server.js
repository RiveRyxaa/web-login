const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');

const app = express();
const PORT = 3000;

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/rivexstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route GET ke halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route POST login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.send('User tidak ditemukan');
  }

  const valid = await bcrypt.compare(password, user.password);
  res.send(valid ? 'Login berhasil!' : 'Password salah');
});

// Jalankan server
app.listen(PORT, () => console.log(`Server running di http://localhost:${PORT}`));
