

build:
	docker build -t pdfeteer .

start:
	docker run --name pdfeteer -p 3000:3000 --rm -d pdfeteer

down:
	docker stop pdfeteer

tag:
	docker tag pdfeteer deselbi/pdfeteer:1.0.0
push:
	docker push deselbi/pdfeteer:1.0.0
