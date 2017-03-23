# Test

## To get started

 * clone the repo and switch to the `Scibsted` branch
 * `npm run build`
 * `npm run test:e2e`
 * `npm start`
 * open http://localhost:8080/
 
## To Use

 * chose a format
 * click `fetch`
 
## Decisions made

To keep the app small _and_ keep the app easy to maintain (as it is predicted to grow) i chose Preact to help.  The total app size is **12.8kb** including an es6 polyfill for Internet Explorer.

## In the future

 * Add code highlighting to response
 * inline CSS to help Critical Path Rendering
 * Ensure the form works without JS (for people on slow connections)
 * improve styling for older browsers (the focus was to make them functional).
