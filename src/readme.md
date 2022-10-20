npx parcel src/index.html to launch server
ES6 code (e.g., your import and export statements) and JSX code must be transpiled in Babel
When building, keep in mind that the component hasn’t yet been drawn on the screen programmatically, which means the constructor() method is executed before the render() method. This is why constructor is the place to initialize a state’s values.
The initial value of selectedMovie state is going to be null. This tells the application that no movie cards were clicked. 