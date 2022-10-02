all :
	docker-compose up --build -d
clean :
	docker-compose down --rmi all

nclear: clean
	docker image prune --force
	docker volume prune --force
	docker network prune --force
	docker system prune --volumes --force

re : fclean all
