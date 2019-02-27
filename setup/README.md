Setting up the onboard application.

The app has been designed (and appropriate ports used) to allow you to run all of the activities/demos from cloud shell.  However, it would be helpful if you could also configure your environment to run the non-containerized application on your laptop.  This then supports the story of: how do I get from my environment into kubernetes engine. 

In order to run the app locally, you will need to install node and python3.  The backend api is a simple node application using express.  The frontend is a python3 flask application.  

Regardless of whether you demo locally at the beginning, or exclusively in cloud shell, 
you will need to set up a cloud  project and configure it appropriately. There are helpful setup scripts, but some steps cannot, at time of writing, be scripted.

# Prerequisites before you do anything at all:

You must have all of the following available:

1. A domain you control where you can add DNS entries
    (this is required for authentication using firebase)
2. The ability to create GCP projects
3. At least 3GB space available in cloud shell - some demos use large docker images
   (you might be able to get away with less if you delete as you go)
4. You must have a docker id/login


# Prerequisites before you run any setup scripts:

You must do the following:

1. Create a new google cloud project to host the onboard example
2. Use the cloud console to create an empty Firestore database.
    WARNING ! If you don't create the firestore db, the setup script will 
    permanently ruin your project and you will have to create a new one.
3. Run the following command in cloud shell in your new project to create a static ip  called 'hip-local':

    gcloud compute addresses create hip-local --global
    
4. Go to the DNS management screens for a domain name you control and create DNS entry for hiplocal.yourdomain.ext pointing at the hip-local static ip address you created above
5. Setup a firebase project for your new project
8. Enable Google login in the authentication section
9. Add your new hiplocal.yourdomain.ext domain to  the list of authorized domains 
10. Copy the web setup config from firebase (you will need it very soon)


# Setting up the environment
1. Open a cloud shell window in your new project and create a new 'hip' directory, then cd into it:

    mkdir hip
    cd hip

2. git clone this repository 

    gcloud source repos clone onboard --project=kr-dr-temp-hip

3. Open the code editor and locate the file frontend/templates/layout.html.     
4. Paste the config you copied from firebase over the matching section in layout.html
    (It is at the end of the head section).
5. cd into the setup directory 

    cd setup

6. Export a variable to hold the  domain name you created earlier

export MYDOMAIN=<hiplocal.yourdomain.ext>

7. Check that it was set correctly:

echo $MYDOMAIN

8. Run the following commands to run the setup script

chmod +x setup.sh
./setup.sh

# Congratulations - your project is set up.
# This gives you the base application BEFORE any docker or kubernetes config

9. Use the app engine application to add some happenings, with pictures,
   to give an attractive start-point for the app

# OPTIONAL: Setting up your local environment

If you are going to run the apps on your machine, you need to do the following:

1. install node
2. install python3
3. download the onboard repo
4. Use your development environment to find and replace all references to kr-dr-temp-hip with the id of your google cloud project.
5. To run the python app...
    - you will need to install from requirements.txt
        - on my machine, the command is: /usr/local/bin/pip3 install -r requirements.txt
        - your command may will be simpler/different
    - you may also need to set up a virtual env for python
        - on my machine, the command is: python3 -m venv env
    - you can then run the frontend from the frontend folder using:
        python3 main.py
        (or simply python main.py if you have python3 mapped to python)
        it will take a little while to stat up, but will tell you to browse to :8080
6. To run the node application...
    - you will need to install from package.json
        - open a terminal in the backend folder and type:
            npm install
        - you should then be able to start the backend using:
            npm start