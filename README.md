# Example React site using OpenFootball data

The website uses Sinatra (Ruby) JSON API from OpenFootball as a backend:
https://github.com/sportkit/sport.db.starter.ruby


## Setup

Install the dependencies for both Sinatra and Node apps:

    bundle install
    npm install

To start application start Sinatra JSON API and React code compilation:

    ruby server.rb
    npm start

Then just do `open index.html` to view the page in the browser.
