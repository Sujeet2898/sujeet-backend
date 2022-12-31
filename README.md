1. function create connection will create a connection to mongodb database
2. route "/" is the home route to show that connection is working
3. route "/users" will get the user data from mongodb database
4. route "/store" will store the user data to database. IT will also add created time and updated time
5. route "/users/:id" will edit the user with the id obtained from params
6. route "/deleteUser/:id" will delete the user with the id obtained from params
