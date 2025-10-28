const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/docs', require('./routes/docs'));
app.use('/translations', require('./routes/translations'));
app.use('/notify', require('./routes/notify'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});