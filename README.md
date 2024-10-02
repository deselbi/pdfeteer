# pdfeteer

## Usage:

# To run latest service:

```docker pull deselbi/pdfeteer``` 

then to run service listening on port 3000:

```docker run --name pdfeteer -p 3000:3000 --rm -d deselbi/pdfeteer```

# Service Usage

download example file:https://github.com/deselbi/pdfeteer/blob/main/usage_example.php 

test pdf with command:

```  php usage_example.php  > out.pdf```

# To build service locally  run

Checkout using
```
git clone https://github.com/deselbi/pdfeteer.git
cd pdfeteer
```

Build service container locally (required only once) using command:  

``` $ sudo make build```

start service in container listening on port 3000 using

``` $ sudo make start```

stop container using:

``` $ sudo make stop ```



