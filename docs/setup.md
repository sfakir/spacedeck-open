# Setup

Recommended credentials:

 - SMTP Emailing
 - MySQL or Postgres
 - 



   
   
# Setup (linux)

We have also an ansible role ready, please feel free to contact me (simon@fakir-it.de).

    npm install 
  
  
     
    cd config 
    cp default.json production.json 
    nano production.json
    cd ..
    
Build assets:

    npm i -g gulp
    gulp styles
    
    
# Setup nginx

    sudo apt-get install nginx
    
see nginx.sample.conf
    