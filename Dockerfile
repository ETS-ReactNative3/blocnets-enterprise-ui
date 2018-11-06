# Define image to build from - Use the latest LTS
FROM node:8

# Define where to hold the application code inside the immage - Create app directory
WORKDIR /usr/src/app

# Use npm binary to install dependencies - Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Development Build
RUN npm install
# Production Build
#RUN npm install --only=production

# Bundle app source
COPY . .

# Bind ports to have mapped by the docker daemon
EXPOSE 3000
# Define the command to run app
# Run development version
CMD ["npm", "start"]
# Run producction version
# CMD ["npm","run","build"]
