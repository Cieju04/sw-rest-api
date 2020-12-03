# sw-rest-api
Node.js REST API using the API from https://swapi.dev/

Database: MongoDB
Cache:    Redis

### RUN WITH NODE
* To install packages: `npm install`
* To enable start without babel-node command: `npm run build` or `npm run prod`
* To run in dev: `npm run dev`
* Change env.sample to .env and enter your MONGODB database url. 

### ENDPOINTS 
 **USER REGISTER, LOGIN AND EDIT**
```javascript
POST /signup    // create new User (a sw character will be random assing to new User)
POST /singin    // login user, create new Token

                'PROTECTED ROUTERS (token required)'
PUT /user       // change or update infromation about egsisting user 
DELETE /user    // delete user from the database
```

 **GETING DATA FROM SW API AFTER USER REGISTER, LOGIN AND TOKEN GENERATE**

```javascript
'Given token after login process must be entered in headers => authorization'
GET /resources/films       //return JSON with all starships available for assigned HERO
GET /resources/species     //                     species 
GET /resources/planets     //                     planets
GET /resources/vehicles    //                     vehicles 
GET /resources/starships   //                     starships
```

 **GETTING DATA FROM SW API AFTER ENTERING QUERY ID**
```javascript
'To get resources with ID user have to enter Query Params after name of the resources'
'eg. :http://localhost:8000/planets/?id=5fc820ae9093053c8412970e'

GET /films       //return JSON with all starships available for assigned HERO
GET /species     //                     species 
GET /planets     //                     planets
GET /vehicles    //                     vehicles 
GET /starships   //                     starships
```

##### WHAT TO DO LIST
:white_check_mark:     Shape folder structure, install modules, test local server, connect to DB    
:white_check_mark:     Create user Schema    
:white_check_mark:     Add server-site validation and authentication  
:white_check_mark:     Create authorization system thorugh JWT module, create and verify token    
:white_check_mark:     Enable possibility to edit and delete users from the database    
:white_check_mark:     Add protection of routes through the created authorization system /user   
:white_check_mark:     Add protection of routes through the created authorization system /resources  
:white_check_mark:     Fetch desired resources from Star Wars API assosiated with assigned hero    
:white_check_mark:     Add authorization through user id  
:white_check_mark:     Construct cache mechanizm with the usage of cache modules  
:white_check_mark:     Finish the documentation  
:black_square_button:  Generate container and add run method with Docker Compose  

##### BUGS TO FIX

:black_square_button:  After user update, password in database is not hashed  
:black_square_button:  No specisic error after wrong email type (could be handled on the frontend)

