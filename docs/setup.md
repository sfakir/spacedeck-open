# Setup

Recommended credentials:

 - SMTP E-Mail Credentials
 - MySQL or Postgres
 - 

outer


   
   
## Setup (linux)

We have also an ansible role ready, please feel free to contact me (simon@fakir-it.de).


### Depencencies

The example is for debian/ubuntuu. Please install nodejs as described [here]().

    
    sudo add-apt-repository ppa:chris-needham/ppa
    sudo apt-get update
    sudo apt-get install audiowaveform

    sudo apt-get install ffmpeg ghostscript


    apt-get ffmpeg

    npm install 
  
      
    cd config 
    cp default.json production.json 
    nano production.json
    cd ..
    

Build assets using webpack. This will create the folder 'build' including a combined .js file for faster loading.

    npm run build 
    
    
## Setup nginx

    sudo apt-get install nginx
    
We recommend to use nginx to serve static files and only use nodejs for the dynamic content.
A working example is provided in nginx.sample.conf.  Please use additionally lets encrypt for https.

    
## Running the Server 

We recommend to use pm2 to start and monitor the app. Just go into the root folter and run this:


    npm install -g pm2
    pm2 start --env production

