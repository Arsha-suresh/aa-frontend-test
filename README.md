# ASSA Abloy test

# Instructions

## Pre-req
- Fork the repository
- Create a feature branch, named feature/FIRSTNAME-LASTNAME
- Create an Angular, React or Vue application in the repo

## Task
- Implement a simple search and select history function according to the FIGMA link (https://www.figma.com/file/RjhfsxK7lKOreCO7nprhEc/AA---FrontEnd-test)
- The search should use a public REST API of choice 
    - A suggestion could be: https://api.openbrewerydb.org/breweries/search?page=1&per_page=5&query= (where you need to pass the search query as a string)
- Search for anything
- Display partial search results in a list beneath the search field (5) and an option to show all (let's say that 10 is the maximum)
- When making a selection the search value should be saved with date/timestamp beneath the search box, just like a search history.
- The page should be responsive, so it should be adaptive for all devices/windows
- The search history should be persisted in localStorage
- The logo can be found in the assets folder

## What we will look at extra carefully
- Reactive forms
- Sanity checking
- Design pattern
- Component structuring
- Folder structuring
- HTML5 semantics, more complex SCSS logic (use of variables etc)
- Unit tests

## Additional notes
- Solve the task as far as you think is necessary.
- When done push your branch and let us know it’s done, e.g. by a pull request.
