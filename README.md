# Final Project: CS50’s Web Programming with Python and JavaScript:

# safeindex:

## About: 
Have you ever visited a restaurant, theater or park and felt that this place seemed nice but needs to be a bit more hospitable, manage their crowd better or address some hygiene issues. That's what 'safeindex' is for; it is a website that lets you view the safety and hygiene reviews of any place so you can make an informed decision about visiting it. Anyone can view reviews but only an authorised user can rate any establishment based on how safe and hygienic it is (out of 5 stars). It even allows users to give their recommendations whether it is suitable for a group of people only or if it is suitable for a solo visit as well? Need more space to speak your mind? You can leave text reviews as well along with your star rating. Stay safe, clean and informed the next time you step out!


## Features:
1. Introduction: Only for new users, to orient with site and objectives 
2. Use google maps to see your current location and search from there
3. View safety and hygiene reviews for places from other users
4. Register, login and logout. Google login enabled 
5. Authenticated users can submit reviews 
6. Edit your previous reviews
7. Single Page Application, implemented using Javascript 

## Files and Directories:
- Main Directory: 
   - safety 
      - pycache
      - migrations: all migrations from project 
      - **static/safety:** 
        * **safelogo.png**: logo used for website 
        * **script.js**: Javascript used for project contains logic for fetch "put", "get" requests. Logic for star rating system. Logic for single page viewing for application. Display  changes for divs depending user journey.
        * **styles.css**: stylesheet
      - **templates/safety**: 
        * **index.html**: html file for website 
      - init
      - admin 
      - apps 
      - **models**: models for project. User and Place 
      - tests
      - **urls**: all urls for the project(index, review, reviewpage)
      - **views**: all the functions for the project index, review, reviewpage
   - safetyfolder 
      - pycache
      - init
      - asgi
      - settings
      - urls: app urls
      - wsgi 
   - .env: environment variables
   - **db.sqlite3**: database 
   - manage
   - README: instruction file 
   - requirements.txt: required packages to run
        
## Usage: 
1. Clone directory 
2. cd into root folder which contains "manage.py" file 
3. run command "python manage.py runserver"


## Justification:

This project is different from previous entries. Why?
1. Uses Google Javascript Maps API and places library to show map and data 
2. Fetch data for entries with PUT and GET requests from database
3. OAuth login enabled to login with gmail id 
4. Single page application
5. 5 star rating system designed from scratch using javascript and html/css


**Libraries and API used:** 
1. Google Javascript Maps API 
2. Google OAuth API 
3. Google Places Library 
4. django-dotenv for .env files 
5. django-allauth for OAUTH login



# Website: 

## https://safeindex.herokuapp.com/

# Demo Video: 

## https://www.youtube.com/watch?v=Lu3xxC0T-8g






