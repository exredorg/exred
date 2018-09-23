#! /bin/bash

echo -e "\n>> loading docker images"
docker load -i images_rpi.tar

echo -e "\n>> creating .env file"
echo "COMPOSE_PROJECT_NAME=prod" > .env

echo -e "\n>> done"
echo
echo "Run it with:"
echo "docker-compose up -d"
