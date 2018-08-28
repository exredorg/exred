#! /bin/bash


# register qemu to run arm code
# try --reset if it doesn't work. it'll unregister all first
docker run --rm --privileged multiarch/qemu-user-static:register 2>/dev/null # --reset

# exit on any error
set -e

echo -e "\n>> building exred_db_rpi image"
docker build -t exred_db_rpi -f Dockerfile_db_rpi .

echo -e "\n>> building exred_rpi image"
docker build -t exred_rpi -f Dockerfile_elixir_rpi_dev ../../../

# save images in a tar file
echo -e "\n>> packing up docker images"
docker save -o out/images_rpi.tar exred_db_rpi exred_rpi

echo -e "\n>> bundling all files together"
tar -cvzf out/BUNDLE.tar.gz -C ./out images_rpi.tar -C .. env_file docker-compose.yml -C ./assets loader.sh -C ~/ exred_data
