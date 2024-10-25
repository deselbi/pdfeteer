
# Ensure you have defined your variables
TAG ?= 1.0.4
 MOUNTS:= `pwd`/render.js:/usr/src/app/render.js

build:
	docker pull node:20
	docker build -t pdfeteer .

start:
	docker run --name pdfeteer -p 3000:3000 --rm -d deselbi/pdfeteer:$(TAG)

start-dev:
	docker run --name pdfeteer -p 3000:3000 --rm -v $(MOUNTS) deselbi/pdfeteer:$(TAG)

down:
	docker stop pdfeteer

create-tags:
	docker tag pdfeteer deselbi/pdfeteer
	docker tag pdfeteer deselbi/pdfeteer:$(TAG)

push-tag:
	docker login
	docker push deselbi/pdfeteer:$(TAG)

push-latest:
	docker login
	docker push deselbi/pdfeteer


