#! /bin/bash

# save images in a tar file
docker save -o rpi3_images.tar exred_db_rpi3 exred_rpi3 


tar -cvf BUNDLE.tar rpi3_images.tar env_file docker-compose_rpi3.yml rpi3_docker_load.sh -C ~/ exred_data

exit 0

# tar up ~/exred_data
tar cvf rpi3_exred_data.tar -C ~/ exred_data

# create tar file from any other files needed to run the images
tar cvf rpi3_scripts.tar ./env_file ./docker-compose_rpi3.yml rpi3_docker_load.sh

tar cvzf rpi3_bundle.tar.gz rpi3_images.tar rpi3_exred_data.tar rpi3_scripts.tar

