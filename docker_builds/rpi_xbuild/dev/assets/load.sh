#! /bin/bash


echo -e "\n>> loading docker images"
docker load -i images_rpi.tar


echo -e "\n>> creating .env file"
echo "COMPOSE_PROJECT_NAME=dev" > .env

if [ ! -d "src/" ]; then
  mkdir src
fi
if [ ! -d "src/exred" ]; then
  echo -e "\n>> checking out exred source"
  git clone https://github.com/exredorg/exred.git src
fi

echo -e "\n>> done"
echo
echo "Run the development environment:"
echo "docker-compose up -d"
echo
echo "Attach to it:"
echo "(exred source is mounted in the container)"
echo "./attach.sh"

