# Example React site using OpenFootball data

The website uses Sinatra (Ruby) JSON API from OpenFootball as a backend:
https://github.com/sportkit/sport.db.starter.ruby

React part is based on Pete Hunt starter:
https://github.com/petehunt/react-webpack-template


## Setup

Install the dependencies for both Sinatra and Node apps:

    bundle install
    npm install

To start application start Sinatra JSON API and React code compilation:

    ruby server.rb
    npm start

Then just do `open index.html` to view the page in the browser.


## Architecture

React app makes a distinction between [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.i28vgrepm)

* Presentational Components - only handle props and are stateless functional components
* Container Components - handle state, implemented as ES6 class with Block suffix
