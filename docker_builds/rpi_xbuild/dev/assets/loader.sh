#! /bin/bash


echo -e "\n>> unpacking bundle"
tar -xvzf BUNDLE.tar.gz --warning=none

echo -e "\n>> loading docker images"
docker load -i images_rpi.tar

echo -e "\n>> checking out exred source"
git clone git@github.com:exredorg/exred.git /src

echo -e "\n>> done"
