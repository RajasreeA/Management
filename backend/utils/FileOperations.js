const fs = require('fs/promises');

const contactsFilePath = './data/contacts.json';

// Helper function to read contacts from the JSON file
async function readContactsFromFile() {
  try {
    const data = await fs.readFile(contactsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

// Helper function to write contacts to the JSON file
async function writeContactsToFile(contacts) {
  try {
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf-8');
  } catch (error) {
    throw error;
  }
}

module.exports = {
  readContactsFromFile,
  writeContactsToFile,
};
