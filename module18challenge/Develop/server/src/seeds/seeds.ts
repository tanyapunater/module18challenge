import mongoose from 'mongoose';
import BookModel from '../models/BookModel.js';

// Sample data for seeding
const seedBooks = [
  {
    bookId: '1',
    title: 'The Great Gatsby',
    authors: ['F. Scott Fitzgerald'],
    description: 'A novel about the American dream in the 1920s.',
    image: 'https://example.com/gatsby.jpg',
    link: 'https://example.com/gatsby',
  },
  {
    bookId: '2',
    title: 'To Kill a Mockingbird',
    authors: ['Harper Lee'],
    description: 'A novel about racial injustice in the American South.',
    image: 'https://example.com/mockingbird.jpg',
    link: 'https://example.com/mockingbird',
  },
];

const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    });
    console.log('✅ Connected to the database');

    // Delete all existing Book documents
    await BookModel.deleteMany({});
    console.log('🗑️ All books deleted');

    // Insert the new seed data
    await BookModel.insertMany(seedBooks);
    console.log('Books inserted successfully');

    console.log('Database seeded!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Execute the seeding function
seedDB();