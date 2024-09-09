FROM cypress/included:13.14.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# EXPOSE 8080

CMD ["npx", "cypress", "run"]