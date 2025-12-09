const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

//Middleware
app.use(cors());
app.use(express.json());

//Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
