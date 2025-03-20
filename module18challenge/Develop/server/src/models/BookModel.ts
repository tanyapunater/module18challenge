import { model, type Document } from 'mongoose';

// Use require() to lazily import bookSchema to avoid circular dependency
const bookSchema = require('./Book').default; // Adjust the path if necessary

// Define BookDocument interface (redefine it here to avoid circular dependency)
interface BookDocument extends Document {
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
  link: string;
}

// Create and export the Book model
const BookModel = model<BookDocument>('Book', bookSchema);

export default BookModel;