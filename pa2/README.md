# Project description
This is the implementation of second programming assignment for course Web information extraction and retrieval. In this 
assignment we implemented data extraction using regular expression, xpath and road runner algorithm for six different
web pages.

## Project structure
The repository contains the following folders and files:
- `implementation-extraction` contains code that implements the assignment
- `input-extraction` contains html files used for extracting
- `report-extraction.docx` report in word format
- `report-extraction.pdf` report in pdf format

## Instructions
For running this project you need to have installed dependencies listed in `requirements.txt`. You can install
them using pip:

```shell
pip install -r ./implementation-extraction/requirements.txt
```

### General

After dependencies are successfully installed, you can run the extraction program:
```shell
python ./implementation-extraction/run-extraction.py <ARG>
```

Where `<ARG>` presents one of the possible arguments `A`, `B` or `C`:
* `A` returns extracted data from the 6 web pages using regular expressions
* `B` returns extracted data from the 6 web pages using xpath
* `C` returns generation of extraction rules for the 6 web pages using road runner algorithm

(**Warning**: If you run the program from a different folder, you will also need to change file paths specified in the program)


### Road runner

Road runner algorithm can also be run by itself from `implementation-extraction` folder:
 ```shell
 python ./road_runner.py
```

This will run the algorithm on test html files `testA.html` and `testB.html`. The input can be changed, by changing
the first two arguments of the `road_runner` method. The method also accepts few other useful optional arguments:
- `encoding` the encoding for reading and writing to file
- `shouldPrint` boolean value which tells the method to print additional information while executing
- `file` path to the output file