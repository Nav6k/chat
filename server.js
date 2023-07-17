import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';

const urlencoded = bodyParser.urlencoded;
const json = bodyParser.json;

const app = express();
const port = 3000;

app.use(urlencoded({ extended: true }));
app.use(json());

// MongoDB connection string (replace with your own connection details)


// Create a new user registration endpoint
app.post('/register', (req, res) => {
  // Retrieve input values from the request body
  const username = req.body.username;
  const password = req.body.password;

  // Connect to MongoDB
  MongoClient.connect(mongoURI, (err, client) => {
    if (err) {
      console.log('Failed to connect to MongoDB:', err);
      res.status(500).send('Failed to connect to MongoDB');
      return;
    }

    // Access the database
    const db = client.db();

    // Create a new user document
    const user = { username: username, password: password };

    // Insert the user document into the "users" collection
    db.collection('users').insertOne(user, (err, result) => {
      if (err) {
        console.log('Failed to insert user:', err);
        res.status(500).send('Failed to register user');
        return;
      }

      console.log('User registered:', result.ops[0]);
      res.status(200).send('User registered successfully');
    });

    // Close the MongoDB connection
    client.close();
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});