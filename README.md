# PhotoFixer-exif

PhotoFixer is a really quick script that i wrote to help me organize all the photos from everyone in my family. Its saved me hours of work so figured it would be nice to share it if anyone else would like to use it. Essentailly everyone in my family has their own camera alongside their mobile phone so when it comes to storing all the files you have IMGXXX/DIMXXX/DCIMXXX/PHOXXX and theyre just a pain to organize. What this does it takes all those files and organizes them by date and time. The XX part is for Location, since i like to know where the photos were taken, but you can easily remove that in the code.

  - Clone from GitHub
  - NPM Install
  - Drop files you want to be processed in to 'process' folder
  - 'node creator.js'
  - Tell it who the photographer is 'eg John Doe > JD'
  - Magic
  - Rename XX to wherever the photos were taken

### Version
0.0.1

### Installation

Clone from github

```sh
$ git clone https://github.com/xjonsson/photofixer-exif.git
```

```sh
$ cd photofixer-exif/
$ npm install
```

Drop the files you want to process into photofixer-exif/process

```sh
$ node creator.js
```

Specify your photographers name

![Processing Images](http://xsync.io/github/photofixer-exif/photofixer-exif.gif)

### Issues

* I have not added every camera that exists, only the ones which i have played with. If its giving you a weird ending then just go and add another case into the code, it should spit out the EXIF information that is making the name weird if you check the console.
* I fix sequencing by adding 1 if the file exists. This works for the most part, but if your creating a dump from GoPro with 30images a second, you might want to add an additional number at the end.
* I have run this with over 65,000 photos and organized the last 14 years worth with this in a few days, it has worked for me but i take no responsibility if you lose your photos. Always do a copy into the process folder not your originals just in case =]


### Future

I seriously doubt that i will be doing very much more with this except if it i find anything else thats annoying but if you would like to add your cameras or any contributions just send me a pull request and i'll see if i can maintain it =]




License
----

MIT

**Get naked and run free**
