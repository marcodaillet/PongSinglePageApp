all :
	docker-compose up --build -d
clear :
	docker-compose down --rmi all

fclear: clear 
	docker image prune 
	docker volume prune 
	docker network prune 
	docker system prune --volumes 

re : fclear all