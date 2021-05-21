# Project description
This is the implementation of third programming assignment for course Web information extraction and retrieval. In this 
assignment we implemented a simple inverse index for finding relevant documents.

## Project structure
- `implementation-indexing` contains code that implements the assignment
- `implementation-indexing/inverted-index.db` created sqlite database used for inverse index
- `implementation-indexing/fill_db.py` program that creates and fills the database
- `implementation-indexing/run-sqlite-search.py` program that searches the documents using inverse index 
- `implementation-indexing/run-basic-search.py` program that searched the documents sequentially
- `report-indexing.pdf` report in pdf

## Instructions
Open python console and run the following to download nltk data:
```python
import nltk
nltk.download('stopwords')
nltk.download('punkt')
```

You also need to have SQLite driver and dependencies listed in `requirements.txt` installed. You can install the dependencies using pip:
```bash
pip install -r ./implementation-indexing/requirements.txt
```

### Running
After dependencies are successfully installed, move to `implementation-indexing` folder. From there, you can run the inverted index search with:
```bash
python ./run-sqlite-search.py <ARG>
# Example: python ./run-sqlite-search.py Republika Slovenija
```
Where `<ARG>` present the search query. Similarly you can run the basic search, without reverse index:
```bash
python ./run-basic-search.py <ARG>
```
