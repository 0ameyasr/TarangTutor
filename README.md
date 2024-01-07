# Tarang's Tutorials (TarangTutor)

This repository 'TarangTutor' is specifically designed for 'Tarang's Tutorials' and can be deployed locally as well as on a service-based deployment platform.  

## Local Deployment
Make sure you have a conducible node.js runtime environment along with Express JS which should be able to handle Embedded JS (EJS) files. The Node Package Manager (NPM) is also a given prerequisite that should be installed beforehand.

Run the command given below to install all given dependencies in the package.json file. This step requires NPM.
```bash
npm i
```

Proceed to run the initiation command to start the server.
```
node app.js
``` 
(You may also use nodemon, an installed dependency to initiate the app. It shall observe for any changes you make to app.js and restart the server accordingly.)

But, before you do so, make sure that the server is started on an unblocked port and that there are proper permissions to run commands and scripts as and when required. This project uses Google's reCAPTCHA v2 which requires a SITE_KEY and SECRET_KEY for flawless functioning. If you wish to deploy this locally on your system, it is recommended that you register for reCAPTCHA v2 on the portal [here](https://www.google.com/recaptcha/about/). 

It will be best to create a .env file specifying all the specifics used in app.js (namely PORT, MONGO_URL, SITE_KEY, SECRET_KEY). The admin credentials are placed on our MongoDB server which shall not be shared for privacy purposes.


## Deployed Usage
This project will be hosted on [this](https://tarangtutorials.onrender.com) link through [render](https://render.com), on a free virtual machine. The latest commits of the project shall be reflected on the link aforementioned.

