
# Dockerfile

FROM node:15-alpine
# base image

# create & set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy source files
COPY ./package.json /usr/src/app/

# install dependencies
RUN npm install
RUN npm rebuild node-sass

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN mkdir -p /usr/src/app/.next
RUN chown -R nextjs:nodejs /usr/src/app/.next
USER nextjs


# start app
# RUN npm run build
EXPOSE 3000
CMD npm run dev

