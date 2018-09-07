run:
	docker-compose -f docker/docker-compose.yml up -d

interactive:
	docker-compose -f docker/docker-compose.yml up

stop:
	docker-compose -f docker/docker-compose.yml stop

down:
	docker-compose -f docker/docker-compose.yml down


# Misc

purge-db:
	rm -rf database/

purge-docker:
	docker-compose -f docker/docker-compose.yml rm -s

purge-all: purge-db purge-docker
