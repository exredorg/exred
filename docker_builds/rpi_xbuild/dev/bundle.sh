#! /bin/bash

# save images in a tar file
echo -e "\n>> packing up docker images"
docker save -o out/images_rpi.tar dev_exred_db_rpi dev_exred_rpi

echo -e "\n>> bundling all files together"
if [ -d "~/exred_data" ]; then
  tar -cvzf out/BUNDLE.tar.gz -C ./out images_rpi.tar -C .. env_file docker-compose.yml -C ./assets load.sh attach.sh -C ~/ exred_data
else
  tar -cvzf out/BUNDLE.tar.gz -C ./out images_rpi.tar -C .. env_file docker-compose.yml -C ./assets load.sh attach.sh
fi

echo -e "\n>> removing intermediate tar file"
rm out/images_rpi.tar

echo -e "\n>> done"
echo
echo "Copy 'out/BUNDLE.tar.gz' to the Raspberry Pi, unpack it and run 'load.sh' to load the images into Docker"
echo
echo "scp out/BUNDLE.tar.gz pi@raspberrypi.local:"
echo "ssh pi@raspberrypi.local"
echo "tar -xvzf BUNDLE.tar.gz"
echo "./load.sh"
