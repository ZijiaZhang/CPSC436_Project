FROM node
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
RUN npm run build-webpack
CMD npm run dev
