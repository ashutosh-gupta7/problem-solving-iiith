1. Install these python libraries before starting: flask, sqlite3, datetime  
2. The python script stores the submission data in a database. As a database I am using the file "log_history.db" file using sqlite3.  
3. In case this file isn't already there, then follow these steps to create the database again:  
    -Make sure that sqlite3 is installed on your computer.  
    -Then run "sqlite3 log_history.db" in terminal making sure that you're in the 'Codes' directory.  
    -Then take the text in log_history.sql and run it in terminal to create the table.  
4. Run these commands in the terminal:  

        export FLASK_APP=startserver.py

        flask run

5. The previous step should start a server. Now, go to "localhost:5000" on your web browser.  
6. Type something in the edit area and click the "Submission History" button.  
7. This will open a log page with all your submissions.  