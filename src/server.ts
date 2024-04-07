// app.ts

import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import config from './config';
import routes from './routes';

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Database connection
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server after connecting to the database
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
