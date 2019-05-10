export MYSQL_ADR=127.0.0.1
export MYSQL_USER=root
export MYSQL_PASS=secret85
export MYSQL_DB=testdb

# docker network create mynet
# Db setup
# docker build -t ownmysql:latest -f Dockerfile.mysql .
docker run --network mynet --rm --name my_mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret85 -d ownmysql:latest
sleep 10
docker exec my_mysql mysql -u root --password=secret85 -e "CREATE DATABASE testdb;"
docker exec my_mysql mysql -u root --password=secret85 -e "use testdb; source /root/testdb.sql;"
npm test -- dbhandler
docker stop my_mysql
