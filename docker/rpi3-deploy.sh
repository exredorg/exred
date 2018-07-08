#! /bin/bash

# exit on any error
set -e

# save images in a tar file
echo -e "\n>> packing up docker images"
docker save -o tmp/rpi3_images.tar exred_db_rpi3 exred_rpi3 

echo -e "\n>> bundling all files together"
tar -cvzf tmp/BUNDLE.tar.gz -C tmp rpi3_images.tar -C ../compose env_file docker-compose_rpi3.yml -C ../assets rpi3_docker_load.sh -C ~/ exred_data

echo -e "\n>> copying bundle to RaspberryPi"
scp tmp/BUNDLE.tar.gz pi@raspberrypi.local: 

echo -e "\n>> unpacking on RaspberryPi\a"
ssh pi@raspberrypi.local tar -xvzf BUNDLE.tar.gz --warning=none

echo -e "\n>> loading docker images on RapsberryPi\a"
ssh pi@raspberrypi.local "~/rpi3_docker_load.sh"

echo -e "\n>> starting containers on RaspberryPi\a"
ssh pi@raspberrypi.local "docker-compose up -d"

echo -e "\n>> done"
echo
echo "You can access the Exred UI at: http://raspberrypi.local:4000"

exit 0
