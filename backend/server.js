// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;

const { handleApiErrors } = require('./middleWares/errorHandling.js');

app.use(express.json());
app.use(cors());

// Import the contacts router
const contactsRouter = require('./routes/contact.js');

// Use the contacts router for the '/api/contacts' path
app.use('/api/contacts', contactsRouter);

// Error handling middleware
app.use(handleApiErrors);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
