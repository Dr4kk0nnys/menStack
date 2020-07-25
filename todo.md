## How the todos are going to work

Inside the todos.js file, it will have a database call.  
It will call the todos collection, and passing the user._id as parameter, will retrieve all the todos.  
Then, it will send the todos object to the todos.ejs file.  

### Adding ToDo's
There will be a button called add todo.  
This button will be inside a form, with a POST method.  
This form will then be caught by a handler, inside the todos.js file.  
The values of the todo will be handled, and if everything's ok, it will add it to the database.  

### Removing ToDo's
Each todo will be displayed this way:  

ToDo ID | ToDo Title | ToDo Description
--------| ---------- | ----------------
$20139djsan4k21ksda$-a,sd | Take a break and rest a little | You've been working to much, take a small break.
43ji#a$husadiad9i1j2j3,.1 | Go for a walk on the park | It's such a pleasant day for a walk.

The remove todo button will open a prompt, asking for the todo title.  
If the todo title is found, the todo will be removed.  
If not, it will proceed to an error message/screen.  

#### No plans for editing / updating todos yet