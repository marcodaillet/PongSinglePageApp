docker :
	cd ./containers && docker-compose up --build -d

doc-clean :
	cd ./containers && docker-compose down --rmi all

img-clean : 
	echo y | docker image prune 

vol-clean : 
	echo y |docker volume prune 

net-clean : 
	echo y |docker network prune 

sys-clean : 
	echo y | docker system prune --volumes 

doc-fclean : doc-clean img-clean vol-clean net-clean sys-clean
	
doc-re : doc-flean docker