# Description

This app is my implementation of user management dashboard. Dashboard enables user to view, add, edit, and delete user. All users are displayed in table and user can filter and sort data. For displaying of users pagination is utilized and 10 users are returned from the server on each page.

In case if dashboard is included in any app req to the server should be accessible only by user with role admin, and also validation should be done on front-end where route in Main router should only be accessible for admins.

In the app I'm using soft delete, i.e. user is not deleted from the server but his account status is set to deactivated. This is enabling admin to track history of previous and current users. By default only active users are displayed but user is enabled to retrieve data about deactivated accounts. This can be further extended to suspend user account in case of suspicious user behavior and to reactivate account in later stages.

## Important info

Default port for connection to the express server is 5000 and default proxy set in package.json in client folder is <http://localhost:5000/> (do not forget / at the end of the url string).

.env.development.local file in client folder is used in case if user would like to use VSC studio on gitpod.io. Without .env.development.local file user will receive error Invalid host header. 

User can use seed by running

```
cd server && npm i && node seed
```

If modules are not installed they should be installed with npm i command, otherwise npm i part can be removed from the code bellow. Seed will add 8 users and 58 dummy users in the database for testing purposes

To test behavior of the app without any user in the database one can run on the server folder

```
node delete seed 
```
## Server

For server I created collection on local. In case user would like to use Atlas MongoDB or any other mongo database, change mongoUri string value in config file. For storing user credentials user should create .env file and store creadential in it and then import it in config file.
## Error handling

For error handling on the server side winston package is used. 

I didn't user ```process.on('uncaughtException', process.exit(1))``` as in upcoming release of the node this is to be removed and this practice is discouraged.

Errors are logged in folder logs in server and filename includes current date string to enable user to easily track any potential errors.

## State management

For state management I used redux-toolkit and for fetching data from the server I used async-thunk.
## UI

For UI I used Material-UI




