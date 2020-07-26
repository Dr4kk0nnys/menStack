## How it's going to work ?

#### Routes

Each method will have it's own individual route, such as:
* Add todo
* Remove todo
* Update todo
* See the list of all ToDo's 
* **Login and Register**

#### Multiple users

The program will have a login scheme.
It will allow multiple users to login, and see it's own ToDO's.
It will have a login route as well.  
It will also have it's own complex system of sessions. And users who are not logged in, won't be able to go to /todos.

#### Database

**The program had a MySQL Database before the one now ( MongoDB ). But it was successfully switched.**  

The program will have one database, two collections:

1. Users collection
2. ToDO's collection

The collections are relational, and the ToDo's collection has it's own _id, but it also takes the user._id ( the owner of the todo ).  
Being so, when the user is logged in, the /todos searches automatically for the todos with the user._id.  

#### Login and Register

The Login and Register part is one of the best I've ever created.  
It has a complex scheme of:
* Register
    * Requires name of at least 3 characters long.
    * Requires a trusty email ( @gmail.com / @yahoo.com / ...)
    * Requires a strong, non-repeat password: ( good: pass123word4, bad: 111111 )
* Login
    * With a complex system of session.
    * The user who's logged in, cannot go to the /login or /register pages.
    * The user who's not logged in, cannot go to the /todos, /todos/add_todo and /todos/remove_todo pages.
    * The user can even leave the website, and when they are back, the session will still be stored.

