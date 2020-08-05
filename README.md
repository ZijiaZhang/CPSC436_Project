# CPSC436 Group Project


## Project Description: 
UBC TANTAN is a full-stack social networking web application, which allows new students to UBC to edit their profiles, share posts, add new friends, and chat with them. It also supports group chats, backend monitoring, and friend recommendations.

[![Build Status](https://travis-ci.com/ZijiaZhang/CPSC436_Project.svg?branch=master)](https://travis-ci.com/ZijiaZhang/CPSC436_Project)
[![codecov](https://codecov.io/gh/ZijiaZhang/CPSC436_Project/branch/master/graph/badge.svg)](https://codecov.io/gh/ZijiaZhang/CPSC436_Project)


## Project task requirements:
### 3-5 minimal requirements (will definitely complete)
- [x] User Login/Sign up
- [x] Newsfeed page to post, share thought in text, picture
- [x] Add friends
- [x] Two people chat in the private chat room
- [x] Find, search people by name

### 3-7 "standard" requirements (will most likely complete)
- [x] Able to set blog post to public/private/to friends
- [x] Announcement system and notifications
- [x] Comment, Like to a post
- [x] Hide Post and Save Post
- [x] BlockList
- [x] Recommend by tags (people you may be interested in)
- [x] Backend monitoring system

### 2-3 stretch requirements (plan to complete 1!)
- [x] Group chat
- [ ] Apps and games to help users interact
- [x] Smart Algorithm for recommended posts and friends as well as avoided posts and users


## Description on how tech from Units 1-5 are used in the project
- Our team applied HTML and CSS styling (including media query) to make the web responsive to Mac Pro, IPad Pro, and iPhone; Instead of JavaScript, we used TypeScript since it is easier for others to read and maintain. 
- Our project's front end relied on the React framework with react-router to switch between pages. Pages were separated into different folders with related react components; besides, all shared components were extracted into a shared folder. We also used Redux to store the app's global state, including posts, chat history, and personal profiles. 
- The project used a MongoDB database and Mongoose ODM. We wrote different schemas, such as posts, comments, and users, to store the app into this NoSQL Database.
- We used Node & Express to connect the frontend to the backend. We implemented several REST API endpoints, including login/out, add/delete posts, and search for users/posts; Express Router was used to switch between different pages. We were grouping the APIs based on the database collections. Each collection had its express router.
- Finally, we deployed the app using DigitalOcean. We also used git-auto-deploy and GitHub webhook to automatically deploy when mastering updates. We used Travis to enable the CI, so whenever we created a PR, we could have a clear insight on if the changes would break any tests.


## Description of ‘Above and Beyond’ functionality
- The app allowed different users to chat with each other or group chat with more people. The chat functionality involved using a web socket, which went beyond the requirement of this course. 
- The app was fully-responsive and supported viewing from all types of devices (user-friendly). It also implemented a smart recommendation algorithm to recommend friends to a user. All of these should be considered “beyond the requirement.” 
- We used Typescript as our language, which made our collaborative deployment easier since the strictly typed data structures were well documented and shared around the team. The compiler would also detect many errors when we were rebasing, which lowered the risks of bugs and unpredicted behavior and saved us lots of time when trying to resolve the conflicts.
- The app had a backend monitoring system, which allowed the administrator to see the number of hits for every API endpoint. This feature exceeded the course requirement.
- We added unit tests for all the backend APIs using Mocha and Chai and configured Travis CI and Codecov to run the automation and ensured that the code coverage was more than 80%.


## Description of Next Steps
- Add more features that target UBC students: Currently, there are not many features unique from regular social networking apps. We want to add some more differential points in the future. For example, users can find friends with a similar timetable.
- Implement a better notification system: Our chat functionality can have a better notification system, to remind the current user about the number of (unread) messages and interactions between users’ posts and comments.
- Enhance network security: Now, our app has some vulnerabilities that can be attacked by hackers. For instance, hackers may use Postman to patch users to change their personal information maliciously. We should add Auth to every endpoint to improve security.
- Add more types of posts: Now, our posts do not support files other than images. In the future, we will extend the types of jobs that will help most types of data, long articles/blogs, and links to other sources.
- Add Friend-Request System: Currently, when one person adds another one to his friend, they immediately become friends to each other. We will add a 'Friend-Request' system so the other person may choose to approve or not.
- Rich Text Editor: Currently, our text input editor of posts and chats are only plain text editors. We plan to import a rich text editor so users are free to edit the outlook and structure of their texts.

## List of contributions
- Yu Zhao (y0w1b) developed all of the React & Redux frontends of profile page and home page including posts and users. He also implemented most of the CSS styling in this app. Besides. he fixed a lot of detected bugs in both frontend functionality and backend APIs.
- Ningyuan Xu (m0t1b) developed login/register features and the front end for sidebars and headers. He also implemented the recommendation algorithm to find friends. Finally, he helped write documentation, project coordination (schedule group meetings), and manual testing.
- Zija Zhang (f4r1b) implemented all the chat functionality (including WebSocket), and designed backend API endpoints and implemented endpoints for Chats. He also helped build the project architecture, set up automated testing using Travis CI, and auto-deployed the web app.
- Denise Xu (t2l1b) wrote all the MongoDB schema and the rest of the backend API endpoints. She also implemented the search algorithm to find posts or users and connected group chats with backends. Finally, she was the one who drafted the initial UI design for this app. 


## Project Architecture

Frontend files are stored in `src/frontend` directory. Each page will have an individual directory that stores their specific components and actions. If one component/action is used in more than one page, move them to the shared directory.

Backend files are stores in `src/backend` directory. It includes an API directory with code for API endpoints, a model directory for MongoDB schemas and connections, and a shared directory for implementations of helper functions.

Overview of the structure:


```
.
├── _src  #root directory of all the frontend and backend code
│   └──_frontend 
│      ├──_shared
│      │  ├── actions
|      |  ├── reducers
|      |  └── components
│      ├──_settings
│      │  ├── actions
|      |  └── components
│      ├──_homepage
│      │  ├── actions
|      |  └── components
|       ...
|    └──_backend
|       ├──_api
|       ├──_models
|       ├──_shared
```

## Code Style
The project will be using typescript with webpack.

### Classes
All class names should be in `PascalCase.`

### Functions
All function names should be in `camelCase.`


