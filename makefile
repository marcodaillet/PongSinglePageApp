all :
	docker-compose up --build -d
clear :
	docker-compose down --rmi all

fclear: clear 
	docker image prune -y
	docker volume prune -y
	docker network prune -y
	docker system prune --volumes 

re : fclear all