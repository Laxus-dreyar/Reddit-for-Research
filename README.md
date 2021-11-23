# RedditforResearch
A web app in MEAN stack in which multiple users can upload documents,view documents uploaded by other users,annotate, hightlight and comment on documents.Elastic search and Hypothesis.is was integrated to search on documents and annotations.



# INSTALLATION 

1. Install MongoDB (instructions:
https://docs.mongodb.com/manual/installation/). Ensure it has installed
successfully

2. Install node.js and npm (instructions: https://nodejs.org/en/download/)

3. Install elasticsearch (instructions:
https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html)
Run it using ‘sudo systemctl start elasticsearch.service’

4. Install mongo-connector and elastic2-doc-manager using pip

5. Run the following commands to set up MongoDB and Elasticsearch (step
5 can be also completed by following the instructions from this article, but
be careful to run 5c as mentioned here
https://medium.com/@xoor/indexing-mongodb-with-elasticsearch-2c428
b676343):
a. sudo mongod --dbpath /var/lib/mongodb --replSet rs0 (command
should stay running)
b. Open the mongo shell, and type in ‘rs.initiate()’
c. mongo-connector -n Reddit-for-Research.documents -m
127.0.0.1:27017 -t 127.0.0.1:9200 -d elastic2_doc_manager
(command should stay running)

6. Clone the Reddit-for-Research code, which has the src/ folder with all the
frontend code, and the backend/folder with all the backend/database
code. Then run the following commands to get the backend and frontend
running
a. cd Reddit-for-Research
b. npm install; npm start
c. cd backend; npm install; npm start (OR nodemon server.js, where
nodemon is a package that can be installed using npm)

7. The webapp should be successfully up and running. Register an account,
and upload a document. Run the ‘curl localhost:9200/_cat/indices’
command to check if Elasticsearch has successfully indexed the
Reddit-for-Research database. If it doesn’t show, please redo step 5
carefully
