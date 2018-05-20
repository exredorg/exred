#! /bin/bash

# build database image
docker build -t exred_db -f Dockerfile_db .

# build exred image
docker build -t exred -f Dockerfile_exred ..
