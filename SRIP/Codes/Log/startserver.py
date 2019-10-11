#This file will start the server that will host the webpage and manage an information transfer to the sqlite database.
from flask import Flask, render_template, request, flash
import sqlite3 # Importing Libraries
import datetime


app = Flask(__name__) # Initializing app
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245' # Setting a CSRF key to authenticate transactions

@app.route("/") # The root page url
def lab(): # Function to execute on this page
    return render_template("lab.html") # Render lab.html on this page

@app.route("/save", methods=['GET', 'POST']) # The log history page url
def save(): # Function to execute on this page 
    conn = sqlite3.connect('log_history.db') # Setting a connection to the SQLite database
    data = request.form # Requesting form data and assigning it to a 'data' variable
    

    conn.execute("INSERT INTO log_history_table (time, code, language, problemid) VALUES (?,?,?,?)",(str(datetime.datetime.now()),data['code'],data['language'],data['codeId'])) # Execute the SQL command to insert data
    conn.commit() # Commit the changes
    cursor = conn.cursor() # Set cursor
    cursor.execute("select * from log_history_table order by problemid;") # Execute select command to see all the previous submissions
    rows=cursor.fetchall() # Fetching SQLite output to the program
    conn.close() # Closing connection to prevent simultaneous connections
    
    return render_template("Previous_submissions.html",rows=rows) # Render the log history page


if __name__ == '__main__': # If executed in main, then run in debug mode for testing
    app.run(debug=True)