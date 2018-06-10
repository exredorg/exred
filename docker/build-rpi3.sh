#! /bin/bash

# register qemu to run arm code
# try --reset if it doesn't work. it'll unregister all first
docker run --rm --privileged multiarch/qemu-user-static:register # --reset

# build database image
docker build -t exred_db_rpi3 -f Dockerfile_db_rpi3 .

# build exred image
docker build -t exred_rpi3 -f Dockerfile_exred_rpi3 ..
