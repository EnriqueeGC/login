require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const itemsRoutes = require('./routes/items.routes');
const sequelize = require('./utils/db');

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api', userRoutes);
app.use('/api/items', itemsRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});