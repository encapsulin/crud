pwd
cd Front/crud
npm run build
#sed -i 's/="\//=".\//g' ./build/index.html
aws s3 sync ./build/ s3://dev.encaps.click/
