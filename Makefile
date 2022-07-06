docker :
	cd ./containers && docker-compose up --build -d

doc-clean :
	cd ./containers && docker-compose down --rmi all

img-clean : 
	docker image prune 

vol-clean : 
	docker volume prune 

net-clean : 
	docker network prune 

sys-clean : 
	docker system prune --volumes 

doc-fclean : doc-clean img-clean vol-clean net-clean sys-clean
	
doc-re : doc-flean docker