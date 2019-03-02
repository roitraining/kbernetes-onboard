# Setting up the onboard application.

# WARNING!  THERE ARE STEPS YOU MUST COMPLETE BEFORE RUNNING THE SETUP SCRIPT

The app has been designed (and appropriate ports used) to allow you to run all of the activities/demos from cloud shell.  However, it would be helpful if you could also configure your environment to run the non-containerized application on your laptop.  This then supports the story of: how do I get from my environment into kubernetes engine. (Also, you will not 
be able to demonstrate the fulling working app in cloud shell, just individual parts).

Guidance for setting up and running the app locally are at the bottom of this file.  The backend api is a simple node application using express.  The frontend is a python3 flask application.  

Regardless of whether you demo locally at the beginning, or exclusively in cloud shell, 
you will need to follow the instructions below to set up a cloud  project and configure it appropriately. There are helpful setup scripts, but some steps cannot, at time of writing, be scripted.

# Prerequisites before you do anything at all:

You must have all of the following:

1. A domain you control where you can add DNS entries
    (this is required for authentication using firebase)
2. The ability to create GCP projects
3. At least 3GB space available in cloud shell - some demos use large docker images
   (you might be able to get away with less if you delete as you go)
4. A docker id/login

# Prerequisites before you run the setup script:

You must do the following:

1. Create a new google cloud project to host the onboard example
2. Use the cloud console to create an empty Firestore database in the US Region
    WARNING! If you don't create the firestore db before you run the setup script, you will have to start again in a new project: the appengine deployment will (at least at the time of writing) permanently configure your project to use datastore instead. 
3. Run the following command in cloud shell in your new project to create a static ip called 'hip-local':

    gcloud compute addresses create hip-local --global
    
4. Find the ip in the console, go to the DNS management screens for a domain name you control and create a DNS entry for hiplocal.[yourdomain.ext] pointing at the hip-local static ip address


# Setting up the environment and running the script
1. Open a cloud shell window in your new project and create a new 'hip' directory, then cd into it:

    mkdir hip
    cd hip

2. git clone this repository 

    gcloud source repos clone onboard --project=kr-dr-temp-hip

3. Open the code editor and locate the file frontend/templates/layout.html 
    - you are about to retrieve code from firebase and paste it in here
4. Setup a firebase project for your new project
5. Enable Google login in the authentication section
6. Add two domains to the list of authorized domains 

    hiplocal.[yourdomain.ext]
    [yourprojectid].appspot.com

7. Copy the web setup config from firebase 
8. Paste the config you copied from firebase over the matching section in layout.html
    (It is at the end of the head section).
9. cd into the setup directory in cloud shell
10. Export a variable to hold the  domain name you created earlier

export MYDOMAIN=<hiplocal.yourdomain.ext>

11. Check that it was set correctly:

echo $MYDOMAIN

# WARNING! You are about to run the setup script. It should complete all the key steps,
# but may have a permission problem with deploying the appengine application. If so, 
# look at the error message and assign the service account the necessary permissions
# Then cd to frontend and  run "gcloud app deploy".
# When that completes, do the same with the backend folder.

12. Run the following commands to run the setup script

chmod +x setup.sh
./setup.sh

# This will take quite a while. It deploys a cloud function and an AppEngine application
# The end result give you the base application BEFORE any docker or kubernetes config
# as well as a complete list of demo instructions in the setup folder

13. Use the app engine application to add some happenings, with pictures,
   to give an attractive start-point for the app


# OPTIONAL: Setting up your local environment

If you are going to run the apps on your machine, you need to do/have the following:

1. The GCP sdk installed locally
    - and to see the happenings from this instance, set the current project 
        gcloud config set project [yourdemoproj]
2. install node
3. install python3
4. clone the hiplocal repo from your project - this will give you the correct project ids etc
5. To run the python app...
    - you may need to set up a virtual env for python
        - on my machine, the command is: 
                python3 -m venv env
    - you will need to install from requirements.txt in the frontend folder
        - on my machine, the command is: 
                /usr/local/bin/pip3 install -r requirements.txt
        - your command may well be simpler/different
    - you can then run the ui from the frontend folder using:
            python3 main.py
        (or simply python main.py if you have python3 mapped to python)
        it will take a little while to start up, but should eventually tell you to browse to :8080
6. To run the node application...
    - you will need to install from package.json
        - open a terminal in the backend folder and type:
            npm install
        - you should then be able to start the backend using:
            npm start

# If you choose not to set it up locally (or don't have the time), you will need to demo in cloud shell.  That will involve many of the same steps as above, but with less installation of basic tools.