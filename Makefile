

build:
	docker pull node:20
	docker build -t pdfeteer .

start:
	docker run --name pdfeteer -p 3000:3000 --rm -d pdfeteer

down:
	docker stop pdfeteer

push-tag:
	docker login
	docker tag pdfeteer deselbi/pdfeteer:1.0.0
	docker push deselbi/pdfeteer:1.0.0

push-tag:
	docker login
	docker tag pdfeteer deselbi/pdfeteer
	docker push deselbi/pdfeteer


