### Overview of this project

###### This is the simple realtime chat application crafted with the latest technologies such as ReactJs for frontend MONGODB for database and Nodejs and Express for backend and SokcetIO for realtime communication.



### Steps to Run the Application Locally

#### Server Setup:
1. Navigate to the `Server` folder in your terminal.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file in the `Server` folder.
4. Inside the `.env` file, add the following configurations:
    ```
    PORT=4000
    MONGODB_URI="your_mongodb_address"
    JWT_SECRET="your_random_secret_key"
    ```
   Replace `"your_mongodb_address"` with your MongoDB address and `"your_random_secret_key"` with your chosen secret key for JWT.
5. Start the server in development mode by running `npm run dev` or start the backend server with `npm start`.

#### Client Setup:
6. Navigate to the `Client` folder in your terminal.
7. Run `npm install` to install the dependencies.
8. Create a `.env` file in the root folder of the `Client`.
9. Inside the `.env` file, add the following configuration:
    ```
    VITE_API_BASE_URL="http://localhost:4000/api"
    ```
   This sets the base URL for your API to `http://localhost:4000/api` when running locally.
10. Start the frontend development server by running `npm run dev`.

#### Accessing the Application:
11. Once both servers are running, open your browser and navigate to `http://localhost:5173`.

#### Endpoints:
- `GET /api/`: Tests API functionality and confirms that it's working.
- `POST /api/login`: Handles user login. Requires an object with `email` and `password` fields in the request body.
- `POST /api/register`: Handles user registration. Requires an object with `email`, `password`, and `username` fields in the request body.
- `POST /api/message`: Saves a message to the server. Requires an object with `username` and `text` fields in the request body.
- `GET /api/get-messages`: Retrieves all messages from the server.
