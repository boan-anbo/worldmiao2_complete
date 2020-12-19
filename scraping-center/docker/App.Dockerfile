FROM ubuntu:latest

WORKDIR /var/www/app

# OS TOOLS
RUN apt-get update && \
apt-get install -y curl && \
curl --version && \
apt install -y python2 && \
python2 -V && \
apt install -y build-essential && \
apt-get install -y manpages-dev && \
gcc --version && \
apt-get -y install make && \
# for pupeeteer
apt-get install -y libgbm-dev

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get -y install tzdata \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY . .

## Install Node (with npm)
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y \
 nodejs

RUN npm install

RUN npm rebuild bcrypt --build-from-source && \
npm install -g node-gyp && \
npm install -g @nestjs/cli && npm install pg --save

WORKDIR /var/www/app

RUN npm install puppeteer --unsafe-perm=true --allow-root
#RUN npm i puppeteer \
    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
