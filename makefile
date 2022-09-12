all :
	docker-compose up --build -d
clear :
	docker-compose down --rmi all

fclear: clear 
	docker image prune --force
	docker volume prune --force
	docker network prune --force
	docker system prune --volumes --force

re : fclear all