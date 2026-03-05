#!/bin/bash

echo "Config html nginx"
rm -rf /usr/share/nginx/html/
cp -rf /usr/share/nginx/html.orig/ /usr/share/nginx/html/

exec "$@"