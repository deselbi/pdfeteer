FROM node:20

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
  wget \
  gnupg \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxi6 \
  libxtst6 \
  libnss3 \
  libxrandr2 \
  libasound2 \
  libatk1.0-0 \
  libcups2 \
  libdrm2 \
  libdbus-1-3 \
  libxss1 \
  libglib2.0-0 \
  libxshmfence1 \
  libgbm1 \
  libgtk-3-0 \
  --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app


# Add a script to run Puppeteer
COPY render.js /usr/src/app/render.js
COPY package.json /usr/src/app/package.json

#Install dependencies
RUN npm install

WORKDIR /usr/src/app

CMD ["node", "render.js"]
