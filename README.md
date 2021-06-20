# Log parser

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test-coverage`

Launches the test runner and generates test coverage report

## Design decisions and known problems

### Large files

Application will crush if the attached file is too big. Normally, this would've been handled by 
reading the file line by line, but the native APIs do not provide such method out of the box.
This could be handled by using the readable stream and performing the line-splitting logic.
But it felt like too much for the given task and timeframe.

### Large utils file

File could be splitted by logical pieces. E.g. line parsing should not affect the calculating logic.
Validation functions could also be in a separate file.

### Very basic UI look

Could be made prettier. Also could be split to different tabs for convenience of reading.

### High functions coupling

It is difficult to test the visits counting logic without referencing the file's structure.

