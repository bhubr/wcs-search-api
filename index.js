const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const users = require('./users.json');

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  if (!req.query.search) {
    return res.json(users);
  }
  const search = req.query.search.toLowerCase();
  const filtered = users.filter(
    u => u.name.first.toLowerCase().includes(search)
      || u.name.last.toLowerCase().includes(search)
  );
  return res.json(filtered);
});

app.listen(process.env.PORT || 5100);
