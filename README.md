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

### Launch the sandbox

You can then choose to either launch the webpage or exit.  You can also choose to launch a previously crawled webpage after launching the application 

```
"Yes" or "No" or "Exit" 
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

