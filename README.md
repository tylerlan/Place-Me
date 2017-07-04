# PlaceMe

This is a professional grade API server demonstrating skills gained in the second quarter of Web Development Immersive program at [Galvanize, San Francisco](http://www.galvanize.com/san-francisco/campus).

## Description

PlaceMe allows users to search for, comment, favorite, and share pictures served up from the Flickr API based on Geo Coordinates (latitude and longitude). It is intended to provide a streamlined service for developers interested in accessing photos based on geolocation, and providing tools to build out an elegant and intuitive user interface.

## Current features
+ In its current form, the PlaceMe API  is set up as a sandbox for logged-in users, with two public-facing services for those who have not yet signed up.
+ Anonymous users are able to access the search feature to query the Flickr API using coordinates (lat & lon), as well as view a list of photos that have been favorited by all users.
+ A logged-in user is able to search for, comment on, and 'favorite' photos based on GPS coordinates. They are also able to query the profile information, photos, and comments supplied by other registered users.


## Getting Started
+ For a list of paths and sample output, see the [Documentation](placemedocs.surge.sh).
+ You will need to create a **.env** file in your project that contains:
  1. A ***JWT_KEY***, to enable token creation for user authentication, and
  2. A ***FLICKR_API_KEY*** and ***FLICKR_API_SECRET*** obtained from [Flickr API Services](https://www.flickr.com/services/api/).

## Stack
* Server / DB:
    * Express
    * Knex
    * Postgresql


* Auth:
    * jsonwebtoken
    * bcrypt


* Third Party API:
    * [Flickr](https://www.flickr.com/services/api/)


* Testing:
    * Mocha / Chai
    * Supertest
    * Istanbul


* Documentation:
    * ApiDoc


* Deployment:
    * Heroku

## Future features
+ Enhanced authentication / authorization:
> Employ OAuth to allow users to signup using social media accounts, and build more specialized permissions (e.g. Admin) to delineate boundaries for logged-in users, as well as making certain information more private.
+ Ratings:
> Enable users to rate their stored photos.
+ Join tables
> To let users see favorited photos by highest rated, most commented, etc.
+ Sharing:
> Build out ways for users to share pictures, comments, and ratings with one another, and through other social media.
+ Mapping:
> Create custom, sharable maps of each user's favorites.
