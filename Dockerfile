# Define image to build from - Use the latest LTS
FROM node:8

# Define where to hold the application code inside the image - Create app directory
WORKDIR /usr/src/app

# Use npm binary to install dependencies - Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install Production Runtime and Process Manager for Node.js
RUN npm install pm2 -g
# Development Build
RUN npm install
# Production Build
#RUN npm install --only=production

# Bundle app source
COPY . .

#Set ENV Variable 
ENV node = "development"

# Add ENV value to be used
ADD . $node

# Bind ports to have mapped by the docker daemon
EXPOSE 3000
# Define the command to run app
# Run development version
CMD ["pm2-runtime","npm", "--","start"]
# Run production version
# CMD ["npm","run","build"]
