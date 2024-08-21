const inquirer = require('inquirer').default;
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

function generateSVG(text, textColor, shape) {
  const svgHeader = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
  const svgFooter = `</svg>`;
  const shapeSVG = shape.render();
  const textSVG = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>`;
  return `${svgHeader}${shapeSVG}${textSVG}${svgFooter}`;
}

inquirer.prompt([
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo:',
    validate: input => input.length <= 3 || 'Please enter up to three characters only.'
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter a color keyword or hexadecimal number for the text color:',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['Circle', 'Triangle', 'Square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter a color keyword or hexadecimal number for the shape color:',
  }
]).then(answers => {
  const { text, textColor, shape, shapeColor } = answers;
  let shapeInstance;

  switch (shape) {
    case 'Circle':
      shapeInstance = new Circle();
      break;
    case 'Triangle':
      shapeInstance = new Triangle();
      break;
    case 'Square':
      shapeInstance = new Square();
      break;
  }

  shapeInstance.setColor(shapeColor);
  const svgContent = generateSVG(text, textColor, shapeInstance);

  fs.writeFileSync('logo.svg', svgContent);
  console.log('Generated logo.svg');
});