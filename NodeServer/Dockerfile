FROM node

COPY ./app /var/www/html

# COPY ./frontend/dist/frontend /var/www/html/frontend

WORKDIR /var/www/html
RUN npm install

CMD ["node", "index.js"]