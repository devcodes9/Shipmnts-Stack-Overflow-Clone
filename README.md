# Shipmnts-Stack-Overflow-Clone
Deployed link: <a>https://stack-overflow-backend-gjfm.onrender.com</a>
<br>
Postman API Documentation: <a>https://documenter.getpostman.com/view/17874220/2s9Y5Ty4UF</a>
(You can directly import the collection and test the api)
# To Install And Run:
Clone the repository:
git clone https://github.com/devcodes9/Shipmnts-Stack-Overflow-Clone.git

Navigate to the project directory:
cd Shipmts-Stack-Overflow-Clone

Install the dependencies:
npm install

Create a .env file in the root directory with the necessary environment variables:
env
MONGO_URI=mongodb+srv://stackoverflow:stackpass@cluster0.bn4skvd.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=deviscoding

Run the project:
node server.js

# Example request:
POST-> https://stack-overflow-backend-gjfm.onrender.com/api/v1/signup <br>
Request body: 
{
    "name": "test",
    "username": "test-final",
    "email": "abc9@gmail.com",
    "password": "123",
    "contactno": 9824700091
}

# Key Points about this Project:
-> Deployed <br>
-> Implemented JWT Authentication<br>
-> All necessary routes are protected routes<br>
-> Implemented authorization using auth middleware<br>
-> Database schema designed to be efficient (i.e. less read and write operations) using reference between documents of different collections<br>
-> Used enum of upvote/downvote for voteType mongodb field<br>
-> Searching and sorting for questions is done using database indexing for faster search results<br>
-> Maintainable and Modular Folder structure<br>
-> Error handling acheived through try...catch and various Validations which are used wherever required<br>
-> Scope for API version control<br>
