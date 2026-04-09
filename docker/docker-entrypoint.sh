#!/bin/bash

sed -i "s#CERCLEBACON_PLACEHOLDER_VITE_BASE_URL#${CERCLEBACON_API_URL:=http://localhost:8080/}#g" /usr/share/nginx/html/assets/*

exec "$@"