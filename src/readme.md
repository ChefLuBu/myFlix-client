# My Kung Fu Flix 

This is the client-side view of a film tracking app, specifically for Kung Fu & Wuxia films,  allowing users to create an account, access information about the genre, director & synopsis different films and save them to a personal list of favorites. Users are able to update their personal information and delete their account if desired. The API for this application can be found on the [movie-api](https://github.com/ChefLuBu/movie_api) repo.

## Key Features

The initial landing page is a Welcome screen that allows new-user registration and login functions

Upon login authentication, the user is moved to the films view which displays all film cards and an icon showing any favorited films

film cards contain the following features and information:

Genre button: Opens a dialog with details about the genre of that film

A "Director" button, opening a dialog with details about the director of that film, including a summary, DOB & DOD where applicable

A "Summary" button, opening a dialog with a summary of that film

A "Favorite" button, toggling between adding and removing the film to/from favorite list

The title and film poster

The user can navigate to the profile view where they can:

Update their profile

Delete their account

## Technologies Used

## Links
Live App:
API: https://movie-api-xfet.onrender.com

## Notes

npx parcel src/index.html to launch server

ES6 code (e.g., your import and export statements) and JSX code must be transpiled in Babel

When building, keep in mind that the component hasn’t yet been drawn on the screen programmatically, which means the constructor() method is executed before the render() method. This is why constructor is the place to initialize a state’s values.

The initial value of selectedMovie state is going to be null. This tells the application that no movie cards were clicked. 
