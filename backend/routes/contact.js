const express = require('express');
const router = express.Router();

// Import necessary functions or modules
const {
  readContactsFromFile,
  writeContactsToFile,
} = require('../utils/FileOperations');

// GET all contacts
router.get('/', async (req, res, next) => {
  try {
    const contacts = await readContactsFromFile();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// GET a specific contact by ID
router.get('/:id', async (req, res, next) => {
  try {
    const contacts = await readContactsFromFile();
    const contact = contacts.find((c) => c.id === parseInt(req.params.id));
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// POST create a new contact
router.post('/', async (req, res, next) => {
  try {
    const newContact = req.body;
    if (!newContact.name || !newContact.email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const contacts = await readContactsFromFile();
    newContact.id = Math.floor(Math.random() * 1000);
    contacts.push(newContact);
    await writeContactsToFile(contacts);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// PUT update an existing contact
router.put('/:id', async (req, res, next) => {
  try {
    const contacts = await readContactsFromFile();
    const contactIndex = contacts.findIndex((c) => c.id === parseInt(req.params.id));
    if (contactIndex === -1) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    const updatedContact = req.body;
    if (!updatedContact.name || !updatedContact.email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    contacts[contactIndex] = { ...contacts[contactIndex], ...updatedContact };
    await writeContactsToFile(contacts);
    res.json(contacts[contactIndex]);
  } catch (error) {
    next(error);
  }
});

// DELETE a contact
router.delete('/:id', async (req, res, next) => {
  try {
    const contacts = await readContactsFromFile();
    const contactIndex = contacts.findIndex((c) => c.id === parseInt(req.params.id));
    if (contactIndex === -1) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    contacts.splice(contactIndex, 1);
    await writeContactsToFile(contacts);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});



module.exports = router;
