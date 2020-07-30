# CPSC436 Group Project


## Project Description: 
UBC TANTAN is a full-stack social networking web application, which allows new students to UBC to edit their profiles, share posts, add new friends, and chat with them. It also supports group chats, backend monitoring, and friend recommendations.

[![Build Status](https://travis-ci.com/ZijiaZhang/CPSC436_Project.svg?branch=master)](https://travis-ci.com/ZijiaZhang/CPSC436_Project)
[![codecov](https://codecov.io/gh/ZijiaZhang/CPSC436_Project/branch/master/graph/badge.svg)](https://codecov.io/gh/ZijiaZhang/CPSC436_Project)

# Script Usage

## Compile Frontend & Backend
```shell script 
npm install
npx webpack or npm run build-webpack
```

## Run the App Locally
```shell script 
npm run dev
```

## Who is it for?
UBC students who want to find friends with the same classes, hobbies, etc

## What will it do? 
- Log in/off and sign up
- Create posts to share texts and pictures, like Twitter
- Interact on posts, such as leave comments or like
- Hide or save posts, and make them private, public or friends only
- Add friends, view their profiles and posts, and block them
- Search for posts by details, and friends by names
- Edit personal profile
- Chat with other users

## What type of data will it store?
- Username/ Password
- Basic user information
- Post and Chat history
- Activity history (number of likes or comments) of posts in the news feed page

## What is some additional functionality you can add/remove based on time constraints?
- Chat rooms that allow group chats
- Recommendation algorithms for friends based on majors and similar interest tags
- Backend monitoring system
 
# Project task requirements:
## 3-5 minimal requirements (will definitely complete)
- [x] User Login/Sign up
- [x] Newsfeed page to post, share thought in text, picture
- [x] Add friends
- [x] Two people chat in the private chat room
- [x] Find, search people by name

## 3-7 "standard" requirements (will most likely complete)
- [x] Able to set blog post to public/private/to friends
- [ ] Announcement system and notifications
- [x] Comment, Like to a post
- [x] Hide Post, and Avoid Similar Posts
- [x] BlockList
- [x] Recommend by tags (people you may be interested in)
- [x] Backend monitoring system


## 2-3 stretch requirements (plan to complete 1!)
- [ ] Group chat
- [ ] Apps and games to help users interact
- [x] Smart Algorithm for recommended posts and friends as well as avoided posts and users

# Designs
![](Docs/images/Project_layouts-1.png)
![](Docs/images/Project_layouts-2.png)
