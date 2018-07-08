#! /bin/bash

db_hostname="exred_db_rpi3"
db_port=5432    # don't change it. this is used by exred but the postgresql container uses this and cant use anything else

db_name="exred_ui_dev"
db_username="exred_db_user"
db_password="hello"

# create network
docker network create exrednet

docker run -d --name ${db_hostname} --network exrednet -p ${db_port}:5432 \
    -e POSTGRES_USER=${db_username} \
    -e POSTGRES_PASSWORD=${db_password} \
    -e POSTGRES_DB=${db_name} \
    exred_db_rpi3:latest

docker run -dit --name exred_rpi3 --network exrednet -p 4000:4000 \
    --privileged \
    -e EXRED_DB_HOSTNAME=${db_hostname} \
    -e EXRED_DB_PORT=${db_port} \
    -e EXRED_DB_NAME=${db_name} \
    -e EXRED_DB_USERNAME=${db_username} \
    -e EXRED_DB_PASSWORD=${db_password} \
    exred_rpi3:latest /bin/bash
