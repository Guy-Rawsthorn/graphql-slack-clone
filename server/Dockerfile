FROM node:11

WORKDIR /app

COPY ./ ./

RUN npm install

expose 8000

CMD ["npm", "start"]

# RUN chmod +x ./wait-for-it2.sh

# ENTRYPOINT [ "/bin/bash", "-c" ]

# CMD ["./wait-for-it2.sh" , "127.0.0.1:5432" , "--strict" , "--timeout=300" , "--" , "npm start"]