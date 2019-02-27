# $GOOGLE_CLOUD_PROJECT MUST BE SET
# NOT REQUIRED IF IN CLOUD SHELL
echo 'enabling required apis'
gcloud services enable container.googleapis.com  
gcloud services enable vision.googleapis.com
gcloud services enable cloudfunctions.googleapis.com
echo 'creating bucket with same name as projet and copying in default images'
gsutil mb -c multi_regional gs://$GOOGLE_CLOUD_PROJECT/
gsutil cp ../frontend/static/images/NoImage.jpg gs://$GOOGLE_CLOUD_PROJECT/
gsutil acl ch -u AllUsers:R gs://$GOOGLE_CLOUD_PROJECT/NoImage.jpg
gsutil cp ../frontend/static/images/pending.jpg gs://$GOOGLE_CLOUD_PROJECT/
gsutil acl ch -u AllUsers:R gs://$GOOGLE_CLOUD_PROJECT/pending.jpg
echo 'deploying cloud function'
cd ../function
gcloud functions deploy make_thumbnail --runtime python37 --trigger-resource $GOOGLE_CLOUD_PROJECT --trigger-event google.storage.object.finalize
echo 'using sed to update demo sample code to reference your project and domain'
cd ../setup/demos
sed -i 's/kr-dr-temp-hip/'"$GOOGLE_CLOUD_PROJECT"'/g' *
sed -i 's/hipkube.kwikstart.net/'"$MYDOMAIN"'/g' *
cd ../../frontend
echo 'using sed to update py files in frontend to your project'
sed -i 's/kr-dr-temp-hip/'"$GOOGLE_CLOUD_PROJECT"'/g' config.py
sed -i 's/kr-dr-temp-hip/'"$GOOGLE_CLOUD_PROJECT"'/g' main.py
echo 'creating onboard repository in your project'
gcloud source repos create hiplocal
echo 'adding as remote of local git under name google and pushing code to repo'
git remote add hiplocal https://source.developers.google.com/p/$GOOGLE_CLOUD_PROJECT/r/hiplocal
git push --all hiplocal
echo 'deploying appengine default service'
yes Y | gcloud app deploy
echo 'deploying appengine backend service'
cd ../backend
yes Y | gcloud app deploy
echo 'completed successfully'
echo 'use app engine to create a few happenings'









