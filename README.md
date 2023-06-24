# 💻 CV Terminal Builder

**A powerful and customizable online CV generator with terminal aesthetics**

<h6 align="center">
<img alt="CV Terminal Builder" src="https://github.com/mustafadalga/cv-terminal-builder/assets/25087769/6e47ecb5-8279-423f-9b85-b7fd5308b580">   <br>
   <br>
   <br>
   <br>

<p align="center">
  <a href="#about-cv-">📖 About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#features">💻 Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#used-technologies">💻 Used Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#preparing-your-cv-json">📄 Preparing Your CV JSON</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#demo">👀 Demo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#examples">💻 Examples</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#generating-cv-terminal-website">🚀 Generating CV Terminal Website</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#screenshots">📷 Screenshots</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">🚀 License</a>
</p>



</h6>

## About CV Terminal Builder
CV Terminal Builder is a unique online tool for creating highly personalized CVs in the style of a terminal window. It offers a wide range of customization options to make your CV stand out from the crowd.


You can set a variety of visual parameters, including background and text colors, font size and family, terminal dimensions, and many more. All changes are stored in your local browser storage, so you can easily pick up where you left off.

## Features
* ✏️ Prompt name customization
* 📄 CV upload from device or URL in JSON format
* 🌄 Page background image setting from device or URL
* 🎨 Page and terminal background color customization
* ✒️ Terminal text and cursor color customization
* 🪟 Terminal Glassmorphism effect
* 📏 Terminal size (cols/rows) customization
* 📝 Text font size and family customization
* 🖼️ Text and terminal box shadow application
* 🖼️ Terminal border style application
* 📏 Terminal margin and padding customization
* 💾 Changes are stored in local storage for convenient continuation

## Used Technologies
* 🌟 React.js
* 🔤 Typescript
* 🧩 Zustand for state management
* 🎨 Material UI for user interface
* 🚀 Vite.js for build tool
* 🌈 Prismjs for code highlighting
* 💻 Xterm for terminal emulation


## Preparing Your CV JSON

In order for the CV Terminal Builder to work correctly, you need to provide a valid CV JSON file. The CV JSON follows a specific schema where each object key must have an array as its value.

Here is an example of a valid CV JSON:
```json
{
  "name": ["John Doe"],
  "role": ["Front End Developer"],
  "contact": ["📧 john.doe@example.com", "📞 +1 123 456 7890"],
  "experience": ["Company A - Front End Developer", "Company B - UI/UX Designer"],
  "skills": ["HTML", "CSS", "JavaScript"],
  "projects": ["Project A", "Project B", "Project C"],
  "education": ["University A - Computer Science"]
}
```
Make sure to provide an array for each key in the CV JSON. If a key has only one value, it should still be placed in an array.

## Examples
### Valid CV JSON
```json
{
  "name": ["John Doe"],
  "role": ["Front End Developer"],
  "contact": ["📧 john.doe@example.com", "📞 +1 123 456 7890"],
  "experience": ["Company A - Front End Developer", "Company B - UI/UX Designer"],
  "skills": ["HTML", "CSS", "JavaScript"],
  "projects": ["Project A", "Project B", "Project C"],
  "education": ["University A - Computer Science"]
}
```

### Invalid CV JSON
```json
{
  "name": "John Doe",
  "role": "Front End Developer",
  "contact": "john.doe@example.com",
  "experience": "Company A - Front End Developer",
  "skills": "HTML, CSS, JavaScript",
  "projects": "Project A",
  "education": "University A - Computer Science"
}
```
In the invalid CV JSON example, each key does not have an array as its value, which will result in a validation error.


##  Demo
* 🔗 Check out https://mustafadalga.github.io, a website generated with the CV Terminal Builder.


##  Generating CV Terminal Website
Sure! Here's a brief summary of the steps to generate and deploy your CV Terminal Website:

<img alt="Generating CV Terminal Website" height="64" src="https://github.com/mustafadalga/cv-terminal-builder/assets/25087769/b5bebd14-2645-4dab-9737-ed5b101384c9"/>

Generate Code → Copy Generated Code → Create an HTML File → Paste the Generated Code → Deploy Your CV Terminal Website

By following these steps, you'll be able to generate the code for your CV Terminal Website, create an HTML file with the code, and deploy the website to make it accessible online.

## Screenshots
![cv terminal builder](https://github.com/mustafadalga/cv-terminal-builder/assets/25087769/fde21e38-7505-4afe-9c55-38a3855ea1df)

![cv terminal builder](https://github.com/mustafadalga/cv-terminal-builder/assets/25087769/c8034504-d269-4e16-8d46-f9a76155593a)




## License
[![License](https://img.shields.io/badge/LICENSE-GPL--3.0-orange)](https://github.com/mustafadalga/cv-terminal-builder/blob/main/LICENSE)
