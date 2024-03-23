import os
from pathlib import Path

# Define BASE_DIR
BASE_DIR = Path(__file__).resolve().parent.parent

# Concatenate BASE_DIR with relative path to your SQLite database file
db_path = BASE_DIR / 'db.sqlite3'

# Convert path to string
db_path_str = str(db_path)

# Print the path to your SQLite database file
print("Path to SQLite database file:", db_path_str)

