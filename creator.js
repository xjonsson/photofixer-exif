var recursive = require('recursive-readdir');
var ExifImage = require('exif').ExifImage;
var prompt = require('prompt');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var photographer = '';
var oldFiles = [];

recursive('./process', function (err, files) {
  // Files is an array of filename
  //console.log(files);

  prompt.start();
  prompt.get(['Photographer'], function (err, result) {
    if (err) {
      return onErr(err);
    }
    else {
      //console.log(result.Photographer);
      photographer = result.Photographer;
      oldFiles = files.slice();
      // console.log(oldFiles);

      for (i = 0; i < oldFiles.length; i++) {
        fixFiles(oldFiles[i]);
      }
    }
  });
});

function fixFiles(file) {
  //Cycle through and rename all the files
  try {
    var filename = [];
    var renameTo = '';
    var putIn = '';
    new ExifImage({ image : file }, function (error, exifData) {
      if (error) {
        console.log('Error: '+error.message);
      }
      else {
        //console.log(exifData); // Do something with your data!
        var camera = exifData.image.Model;
        var taken = exifData.exif.CreateDate; //DateTimeOriginal;
        var exif = exifData;
        var extension = '_' + photographer + '_';

        switch(camera) {
          case 'iPhone':
            camera = 'i1'
            break;
          case 'iPhone 3G':
            camera = 'i3g'
            break;
          case 'iPhone 4S':
            camera = 'i4s'
            break;
          case 'iPhone 4':
            camera = 'i4'
            break;
          case 'iPhone 5S':
            camera = 'i5s'
            break;
          case 'iPhone 5':
            camera = 'i5'
            break;
          case 'GT-N7000':
            camera = 'gt9700'
            break;
          case 'Canon PowerShot G10':
            camera = 'g10'
            break;
          case 'u40D,S500,uD500 ':
            camera = 'st5'
            break;
          case 'NIKON D50':
            camera = 'd50'
            break;
          case 'NIKON D40':
            camera = 'd40'
            break;
          case 'DSC-P100':
            camera = 'p10'
            break;
          case 'Canon DIGITAL IXUS 40':
            camera = 'dx40'
            break;
          case 'Canon EOS 20D':
            camera = 'c20d'
            break;
          case 'Canon EOS 5D':
            camera = 'c5d'
            break;
          case 'NIKON D3':
            camera = 'nd3'
            break;
          case 'HP psc1500':
            camera = 'nfc'
            break;
          case 'COOLPIX L11':
            camera = 'cl11'
            break;
          case 'SIGMA SD10':
            camera = 'sd10'
            break;
          case 'FinePix S3Pro  ':
            camera = 'fs3p'
            break;
          case 'SLP800':
            camera = 'p800'
            break;
          case 'SLP1000SE':
            camera = 'nfc'
            break;
          case 'SP-2000':
            camera = 'sp2000'
            break;
          case 'SP-3000':
            camera = 'sp3000'
            break;
          case 'DSC-T1':
            camera = 'dt1'
            break;
          case 'EX-Z75     ':
            camera = 'z75'
            break;
          case 'HERO4 Black\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000':
            camera = 'gh4b'
            break;
          default:
            // Just return the camera
          }

          if (camera == undefined) {
            camera = 'nfc';
          }

          // Set the extension
          extension += camera + path.extname(file);

          if (taken == '    :  :     :  :  ') {
            console.log('FILE HAS NO EXIF :: ' + file);
            console.log(exif);
          } else {
            // File has EXIF use it
            // Set the date object
            console.log('TAKEN: ' + taken);
            if (taken != undefined) {
              taken = taken.split(' ');
              // Split date
              taken[0] = taken[0].split(':');
              // Split time
              taken[1] = taken[1].split(':');
              //console.log(taken);
              filename[0] = taken[0][0]; // Year
              filename[1] = taken[0][1]; // Month
              filename[2] = taken[0][2]; // Day
              filename[3] = taken[1][0]; // Hour
              filename[4] = taken[1][1]; // Minutes
              filename[5] = taken[1][2]; // Seconds
              //console.log(filename);
              renameTo = filename[0] + '-' +
                filename[1] + '-' +
                filename[2] + '-' +
                'XX_' +
                filename[3] +
                filename[4] +
                filename[5] +
                extension;
              //console.log(renameTo);

              //Folder name
              putIn = filename[0] + '-' +
                filename[1] + '-' +
                filename[2] + '-' +
                'XX';

              //Rename the file
              console.log('FILE: ' + file);
              console.log('BECOMES: ' + renameTo);
              console.log('PUTIN: ' + putIn);

              mkdirp('process/' + putIn, function(err) {
                if (err) {
                  console.log(err);
                  return;
                } else {
                  // Check to see if the file exists
                  fs.access('process/' + putIn + '/' + renameTo, fs.F_OK, function(err) {
                    if (err) {
                      //File doesnt exist
                      // ITS THERE DROP SHIT IN IT
                      fs.rename(file, 'process/' + putIn + '/' + renameTo, function(err) {
                        if(err) {
                          console.log(err);
                          console.log(exif);
                          return;
                        } else {
                          console.log('File successfully written: ' +
                            'process/' + putIn + '/' + renameTo);
                        }
                      });
                    } else {
                      //File exists rename it
                      var newTime = parseInt(taken[1][2]);
                      newTime++;
                      newTime = newTime.toString();
                      filename[5] = newTime;
                      renameTo = filename[0] + '-' +
                        filename[1] + '-' +
                        filename[2] + '-' +
                        'XX_' +
                        filename[3] +
                        filename[4] +
                        filename[5] +
                        extension;

                      // ITS THERE DROP SHIT IN IT
                      fs.rename(file, 'process/' + putIn + '/' + renameTo, function(err) {
                        if(err) {
                          console.log(err);
                          return;
                        } else {
                          console.log('File successfully written: ' +
                            'process/' + putIn + '/' + renameTo);
                        }
                      });
                    }
                  });
                }
              });
            }
          }
        }
      });
  } catch (error) {
      console.log('Error: ' + error.message);
  }
}
