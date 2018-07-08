#! /bin/bash

echo ">> packing up docker images"
docker save -o tmp/rpi3_images.tar exred_db_rpi3 exred_rpi3 

echo ">> bundling all files together"
tar -cvzf tmp/BUNDLE.tar.gz -C tmp rpi3_images.tar -C ../compose env_file docker-compose_rpi3.yml -C ../assets rpi3_docker_load.sh -C ~/ exred_data

echo ">> done"
echo "bundle: tmp/BUNDLE.tar.gz"

exit 0

