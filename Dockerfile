FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["npm","start"]
EXPOSE 3000