function create connection will create a connection to mongodb database
route "/" is the home route to show that connection is working
route "/users" will get the user data from mongodb database
route "/store" will store the user data to database. IT will also add created time and updated time
route "/users/:id" will edit the user with the id obtained from params
route "/deleteUser/:id" will delete the user with the id obtained from params
