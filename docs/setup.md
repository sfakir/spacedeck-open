# Setup

Recommended credentials:

 - SMTP Emailing
 - MySQL or Postgres

outer

   
   
# Setup (linux)

We have also an ansible role ready, please feel free to contact me (simon@fakir-it.de).

    npm install 
  
  
     
    cd config 
    cp default.json production.json 
    nano production.json
    cd ..
    

Build assets using webpack

    npm run build 
    
    
# Setup nginx

    sudo apt-get install nginx
    
see nginx.sample.conf
    
# Start 

We recommend to use pm2 to start and monitor the app. Just go into the root folter and run this:


    npm install -g pm2
    pm2 start --env production

