#! /bin/bash

db_hostname="postgresql_database"
db_port=5432    # don't change it. this is used by exred but the postgresql container uses this and cant use anything else

db_name="exred_dev"
db_username="zkeszthelyi"
db_password="hello"

docker run -d --name ${db_hostname} --network exrednet -p ${db_port}:5432 \
    -e POSTGRESQL_USER=${db_username} \
    -e POSTGRESQL_PASSWORD=${db_password} \
    -e POSTGRESQL_DATABASE=${db_name} \
    -e POSTGRESQL_ADMIN_PASSWORD="postgres" \
    centos/postgresql-96-centos7

docker run -dit --name exred --network exrednet -p 4000:4000 \
    -e EXRED_DB_HOSTNAME=${db_hostname} \
    -e EXRED_DB_PORT=${db_port} \
    -e EXRED_DB_NAME=${db_name} \
    -e EXRED_DB_USERNAME=${db_username} \
    -e EXRED_DB_PASSWORD=${db_password} \
    exred:0.1.3 /bin/bash

