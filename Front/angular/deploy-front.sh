cd "$(dirname "$0")"; pwd
cd crud
ng build --configuration=production
aws s3 sync ./dist/crud/browser/ s3://domkuh.encaps.click/
