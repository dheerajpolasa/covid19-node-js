# covid19-node-js
A Hospital API for the doctors for testing and quarantine + well being of COVID - 19 patients

**Packages to be installed to use this project**
- express
- mongoose
- passport
- connect-flash
- ejs
- express-ejs-layouts
- expresss-sesion
- connect-mongo

**Project Structure**
- **index.js** File which is responsible for making server up and running
- **routes** Folder where are traffic/routes is/are handled
- **controllers** Folder where all the functions get the requested data from models
- **config** Folder where all the config files are stored (mongoose.js, passport.js, middleware.js, etc)
- **models** Folder where all the models are stored (Logical structure of database)
- **views** Folder where all the ejs templates are stored
- **assests** Folder where all the static files are stored (css, js, images, etc)

**Project setup on local**
- Install all the required libraries
- Provide your database name in the mongoose.js file
- If you want to change anything related to mongo-store, make changes in the **main index.js** file
- You are all set to use this project on your local 😄!
