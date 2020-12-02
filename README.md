# sw-rest-api
Node.js REST API using the API from https://swapi.dev/



### RUN WITH BABEL
* To install: `npm install`
* To run in dev mode: `npm run dev`

### ENDPOINTS 
 **USER REGISTER, LOGIN AND EDIT**
```javascript
POST /signup    // create new User (a sw character will be random assing to new User)
POST /singin    // login user, create new Token

                'PROTECTED ROUTERS (token required)'
PUT /user       // change or update infromation about egsisting user 
DELETE /user    // delete user from the database
```


##### WHAT TO DO LIST
:white_check_mark:     Shape folder structure, install modules, test local server, connect to DB    
:white_check_mark:     Create user Schema    
:white_check_mark:     Add server-site validation and authentication  
:white_check_mark:     Create authorization system thorugh JWT module, create and verify token    
:white_check_mark:     Enable possibility to edit and delete users from the database    
:white_check_mark:     Add protection of pathways through the created authorization system /user 
:white_check_mark:     Add protection of pathways through the created authorization system /resources
:black_square_button:  Fetch desired resources from Star Wars API assosiated with assigned hero  
:black_square_button:  Add authorization through user id  
:black_square_button:  Construct cache mechanizm with the usage of cache modules  
:black_square_button:  Finish the documentation  
:black_square_button:  Generate container and add run method with Docker Compose  


##### BUGS TO FIX

:black_square_button:  After user update, password in database is not hashed  

