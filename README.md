# crawl-to-dev-app

A command-line node application to create a local development environment (or sandbox) based on a live 3rd party webpage.  I would like to thank s0ph1e for her work on the npm website-scraper package.  Without it, I would not have been able to create this application. 

Disclaimer:  This is the first node application that I have built.  

## Getting Started

You should be able to clone the repo than run npm install to install the dependencies.  

### Installing the app

```
npm install
```

### Launching the app

```
node app
```

### Using the app

```
"Launch an existing website" or "Crawl a new web page"  
```

### Crawling a webpage

Enter a url

```
https://www.google.com
```
Enter a unique folder name.  Warning: The app will fail if the folder name that is entered already exists. 

```
google-search
```

### Launching the sandbox

You can choose to either launch a sandbox immediately after the webpage has been crawled or after starting the app.  

```
"Yes" or "No" or "Exit" 
```

### Using the sandbox

Once the sandbox has been created and launched, you can edit either the "jsChanges.js" or "cssChanges.css" files that were created in the root of the folder.  You can also edit any of the other files that you would like, but these two files were created to give you a clean slate to work with.   
 
```
"jsChanges.js" or "cssChanges.css" file in the /public/project-name folder   
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Chris Bemister** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* https://www.npmjs.com/~s0ph1e
* https://www.npmjs.com/package/website-scraper

