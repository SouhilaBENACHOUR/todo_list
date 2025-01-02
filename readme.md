This project is a Todo List application built with React for the frontend and NestJS for the backend, connected to a MySQL database. My task was to implement key features, including task creation, task editing, and task deletion. During the test, I faced some challenges, particularly with the port conflict and route issues, which I resolved successfully.

Contributions
Backend 
Task Creation: I implemented the task creation logic, including adding a new route and controller method to handle task creation requests.

Task Editing: I also implemented the functionality to edit existing tasks, ensuring that the update was reflected in the database.

Frontend 
Task Creation: On the frontend, I created the interface to capture the task name and sent the request to the backend for task creation.

Task Editing: I implemented the task editing feature, allowing users to modify tasks and update them in the backend.

Task Deletion: The backend already had the task deletion feature, so I simply integrated it on the frontend by making the necessary API calls.

Challenges and Solutions
1. Port 3000 Conflict : During development, I faced an issue where port 3000 was already in use by another application. To resolve this, I identified the application occupying the port and stopped it, allowing me to use the port for my React app without conflicts.

2. Route Issues : I encountered errors related to missing or incorrect routes when trying to perform task creation and editing. Specifically, I was receiving 404 errors. I debugged the issue by reviewing and correcting the backend route definitions, ensuring that the routes were properly set up to handle the requests from the frontend.

During this test, I implemented key features for the Todo List application, including task creation, task editing, and task deletion. I also solved some challenges related to port conflicts and route errors, ensuring smooth communication between the frontend and backend.