The Flight Search App have the following features,

1.    User can book one way or round trip flights
2.    There should be 2 selectboxes where the user can select Source and Destination Cities.
3.    If user has selected one-way trip, departure date field should be shown.
4.    If the user has selected round trip, departure and arrival date fields should be shown.
5.    When the user performs search a list of flights matching the criteria should be shown as a list.
6.    From the search result page user should be allowed to change search criteria.
7.    On search result page there should be a slider where user can set min value and max value for price. Once the user set the min and max values the results list should be filtered accordingly.
 
Add-on features of the App:

1.    Responsive layout
2.    Persist last search using local storage. And populate fields as per the last search.

Steps to run the App demo:

1.    node server.js  - It runs the http server on NodeJS platform which serves data through REST APIs to the application
2.    open http://localhost:9000 - It is the AngularJS powered Front end to Search flights between 2 cities

Note: If some of the node modules are not working at your end due to different version, please remove node_modules folder from the codebase and run "npm install" command before performing aforementioned steps.
