# Setting up the onboard application.

# WARNING!  THERE ARE STEPS YOU MUST COMPLETE BEFORE RUNNING THE SETUP SCRIPT

The app has been designed (and appropriate ports used) to allow you to run all of the 
activities/demos from cloud shell.  However, it would be helpful if you could also configure 
your environment to run the non-containerized application on your laptop.  This then supports 
the story of: how do I get from my environment into kubernetes engine. (Also, you will not 
be able to demonstrate the full working app in cloud shell, just individual parts).

Guidance for setting up and running the app locally are at the bottom of this file.  The 
backend api is a simple node application using express.  The frontend is a python3 flask 
application.  

Regardless of whether you demo locally at the beginning, or exclusively in cloud shell, 
you will need to follow the instructions below to set up a cloud project and configure it 
appropriately. There is a helpful setup script, but some steps cannot, at time of writing, be 
scripted.

Any UI instructions below are correct at the time of writing, but subject to change. You will 
need to adjust accordingly if you encounter any errors.

# Prerequisites before you do anything at all:

You must have all of the following:

1. A domain you control where you can add DNS entries
    (this is required for authentication using firebase)
2. The ability to create GCP projects
3. The ability to create firebase projects for your GCP projects 
4. At least 3GB space available in cloud shell - some demos use large docker images
   (you might be able to get away with less if you delete as you go)
5. A docker id/login

# Prerequisites before you run the setup script:

You must do the following:

1. Create a new google cloud project to host the onboard example
2. Use the cloud console to create an empty Firestore database in native mode in the US Region. 
    WARNING! If you don't create the firestore db before you run the setup script, 
    you will have to start again in a new project: the appengine deployment will 
    (at least at the time of writing) permanently configure your project to use datastore 
    instead. 
3. Run the following command in cloud shell in your new project to create a static ip called 
'hip-local' (this will require you to confirm enabling an api):

    gcloud compute addresses create hip-local --global
    
4. Find the ip in the External Ip Addresses section of the console, and then go to the DNS 
management screens for a domain name you control and create a DNS entry for:

 hiplocal.[yourdomain.ext] 

pointing at the hip-local static ip address. Make a note of what you create, as you'll  
need it in a moment.


# Setting up the environment and running the script
1. If you have not already done so, open a cloud shell window in your new project 
and clone this repository: 

    gcloud source repos clone onboard --project=kr-dr-temp-hip

2. Open the code editor and locate the file frontend/templates/layout.html 
    - you are about to retrieve code from firebase and paste it in here
3. Setup a firebase project for your new GCP project as https://console.firebase.google.com/.
    - click 'add project'
    - select your project in the dropdown
    - check the box to accept the terms and conditions
    - click Add Firebase
    - confirm/choose Pay as You plan (there are no costs in our useage)
    - click authentication
    - enable sign in method google (set public name and support email)
    - Add two domains to the list of authorized domains 
        hiplocal.[yourdomain.ext]
        [yourprojectid].appspot.com
    - Click Web Setup button (at top right) and copy the web setup config
4. Paste the config you copied from firebase over the matching section in layout.html
    (It is at the end of the head section).
5. return to cloud shell and cd into the setup directory 
6. Export a variable to hold the domain name you created earlier (without the [])

export MYDOMAIN=[hiplocal.yourdomain.ext]

7. Check that it was set correctly:

echo $MYDOMAIN

# WARNING! You are about to run the setup script. At the time of writing, it runs to  
# completion and all steps succeed, but the cloud is always changing.  Be careful to watch 
# for error messages as it runs so that you can backfill anything that failed. The script does # the following:
    - enables apis
    - creates a bucket for images, uploads files and sets permissions
    - deploys a cloud function to resize and approve images
    - rewrites the demo instructions and code samples to use your domain and projects
    - commits changes, creats a repo in your project and pushes the modified code and instructions
    - Deploys the app to AppEngine so that you can use it to create some content for the website before the onboard.

8. Makes sure you are in the setup directory and run the following commands to run 
the setup script

# WARNING! if you haven't created the firestore db, do it now, or you will have 
# to start again in a new project

chmod +x setup.sh
./setup.sh

# This will take quite a while. It deploys a cloud function and an AppEngine application
# The end result give you the base application BEFORE any docker or kubernetes config
# as well as a complete list of demo instructions in the setup folder

9. Use the app engine application to add some happenings, with pictures,
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

# If you choose not to set it up locally (or don't have the time), you will need to 
# demo in cloud shell.  That will involve many of the same steps as above, but with 
# less installation of basic tools. You will not be able to demo the complete 
# application in cloud shell, just the consituent parts.