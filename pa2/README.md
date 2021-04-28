# Project description
This is the result of second programming assignment for course Web information extraction and retrieval. In the second assignment we implemented data extraction using regular expression and xpath for six different web pages.

## Instructions
For running this project you need to have installed: `bs4`, `re`, `json` and `lxml`. We suggest using `pip install <package_name>`.
After we have all dependencies satisfied, we can run our extraction as:<br>
`python ./implementation-extraction/run-extraction.py <ARG>` <br>
For argument (`<ARG>`) use A, B or C, where:
* A returns extracted data from the 6 web pages using regular expressions
* B returns extracted data from the 6 web pages using xpath
* C returns generation of extraction rules for the 6 web pages using road runner algorithm
