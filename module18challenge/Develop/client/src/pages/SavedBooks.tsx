import { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import type { User } from '../models/User';

//
import {useQuery} from '@apollo/client';
import {GET_ME} from '../utils/queries';
import { useMutation } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';


const SavedBooks = () => {
  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedBooks: [],
  });

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  // use useQuery hook to make query request
  //
  const { data } = useQuery(GET_ME, {
    variables: { token: Auth.loggedIn() ? Auth.getToken() : null }, // check if user is logged in and get token
  });

  // set user data after query loads
  if (data && !userData.username) {
    setUserData(data.getMe);
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  // Use the `useMutation()` hook to execute the `REMOVE_BOOK` mutation in the `handleDeleteBook()` function instead of the `deleteBook()` function that's imported from the `API` file. (Make sure you keep the `removeBookId()` function in place!)

 
  const [deleteBook] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null; // get token if logged in

    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook({
        variables: { bookId }
      });

      if (!response.data) {
        throw new Error('something went wrong!');
      }

      setUserData(response.data.removeBook);
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md='4'>
                <Card key={book.bookId} border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
