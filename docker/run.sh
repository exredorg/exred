#! /bin/bash

db_hostname="exred_db"
db_port=5432    # don't change it. this is used by exred but the postgresql container uses this and cant use anything else

db_name="exred_ui_dev"
db_username="zkeszthelyi"
db_password="hello"

docker run -d --name ${db_hostname} --network exrednet -p ${db_port}:5432 \
    -e POSTGRES_USER=${db_username} \
    -e POSTGRES_PASSWORD=${db_password} \
    -e POSTGRES_DB=${db_name} \
    exred_db

docker run -dit --name exred --network exrednet -p 4000:4000 \
    -e EXRED_DB_HOSTNAME=${db_hostname} \
    -e EXRED_DB_PORT=${db_port} \
    -e EXRED_DB_NAME=${db_name} \
    -e EXRED_DB_USERNAME=${db_username} \
    -e EXRED_DB_PASSWORD=${db_password} \
    exred:0.1.4 /bin/bash

