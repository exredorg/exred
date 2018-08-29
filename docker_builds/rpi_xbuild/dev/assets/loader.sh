#! /bin/bash


echo -e "\n>> loading docker images"
docker load -i images_rpi.tar

echo -e "\n>> checking out exred source"
cd ~
mkdir src
git clone https://github.com/exredorg/exred.git src

echo -e "\n>> done"
