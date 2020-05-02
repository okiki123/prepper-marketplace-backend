cd env && touch .env .env.test

echo APP_ENVIRONMENT="staging" >> .env
echo PORT="8080" >> .env

# Database Config
echo DB_HOST=$STAGING_DB_HOST  >> .env
echo DB_USERNAME=$STAGING_DB_USERNAME >> .env
echo DB_PASSWORD=$STAGING_DB_PASSWORD >> .env
echo DB_NAME=$STAGING_DB_NAME >> .env
echo DB_PROTOCOL=$STAGING_DB_PROTOCOL >> .env
echo ADDITIONAL_DATA=$STAGING_ADDITIONAL_DATA >> .env

echo APP_ENVIRONMENT="test" >> .env.test
echo PORT="6060" >> .env.test

# Database Config
echo DB_HOST=$STAGING_DB_HOST >> .env.test
echo DB_USERNAME=$STAGING_DB_USERNAME >> .env.test
echo DB_PASSWORD=$STAGING_DB_PASSWORD >> .env.test
echo DB_NAME=$STAGING_DB_NAME_TEST >> .env.test
echo DB_PROTOCOL=$STAGING_DB_PROTOCOL >> .env.test
echo ADDITIONAL_DATA=$STAGING_ADDITIONAL_DATA >> .env.test
cd ../
