cd ../backend/event
npm install

cd ../../backend/restful
npm install
pwd
cd ../..
node ./backend/event/server.js &
node ./backend/resftul/server.js &
