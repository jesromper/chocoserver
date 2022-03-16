# development
export NODE_ENV=development
export PORT=8008
export DBPORT=27017
docker-compose -p chocolates-devel up -d

# production
# export NODE_ENV=production
# export PORT=8081
# export DBPORT=27015
# docker-compose -p chocolates-prod up -d