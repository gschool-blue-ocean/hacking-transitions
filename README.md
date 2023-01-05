# HACKING TRANSITIONS 

[Deployed Site](https://hacking-transitions-webservice.onrender.com/)

- To access admin portal use: Password/Username: 'admin4'
- To access student portal use: Password/Username: 'student4'


## Contributors 

- [Joe Low](https://github.com/Lowjoejoe) - Project Manager 
- [Idris Yusuf](https://github.com/daleyusuf23) / [Halimat Usman-Isiaka](https://github.com/HAliUsm) - UI/UX Design Team
- [Dre Hurtado](https://github.com/DreLorenz) / [Jakari Thomas](https://github.com/JDT521) - System Architecture Design Team
- [Bolun Yang](https://github.com/yangbyron) - Login/Authentication  Page Team
- [Rene Marquez](https://github.com/drakeleslie) / [Luis Guzman](https://github.com/Lguzman9) - Admin Section Team/ Student Section Team


## What is the *Hacking Tranistions* Application?

Hacking transitions was a `8 person group project`. This project was a brief `1-week sprint` where our team tried to complete an MVP for an external user *Moses Valerio*.

Some goals we had was to render a design similar to that of the Galvanize program. Have full functioning sections utilizing all CRUD operations allowing the ability to fully manipulate any section the user see. Another goal was to add in [animate.js](https://animejs.com) animations to give a little more life to the project.

## What does the app do?

The application was designed to `assist the transition team` at Galvanize by monitoring task, goals, standing and the timelines of Uniformed Military Service Members on their transition from the military to the civilian world ensuring all tasks are complete. 

- Galvanize is responisbile, per an agreement with the US military, to make sure all students are not only developing a new skill set full time, but also completing their military obligations of transitioning out. 

This `application` is designed to keep track of each student in the ever growing and expanding Software Engineering Program that Galvanize offers.

The `user` is able to log in as an admin or a student, depending on which will bring them to their respective page. 

The `admin` is able to manage Cohort information, add, update or delete cohorts, archive cohorts, look at and manage student data. and chat with cohorts as a group or students individually.

The `student` is able to see, add and update their information, add, delete, and update their tasks, and chat with the transition specialist. There are also resources avaliable for students via hyperlinks.

## Tech Stacks Used 

- Javascript
- React
- Next.js 
- PSQL 
- Redux 
- CSS
- Socket.io
- Google Firebase

## Technical Challenges

- The largest technical challenge the team encounted was restructuring the entire application from `vanilla React` to React using `Next.js` 

- One of the biggest learning points during this project was being able to look at legacy code, and break down the changes that were previously made. Understand how everything was being called and breaking down the use of different state management [Redux]. Redux is a very powerful state managment tool when all parties involved know how to use the management system.  

## How does the *Hacking Transitions* application work?

The application has a dedicated `Front-end` framework utilizing [React]() and [Next.js]() and managable state using [Redux](). All of the styling is done through `CSS`. This allows the user to make all the `CRUD` operation calls to the dedicated `Back-end` using [PSQL]().  

The application utilizes [socket.io]() to conduct inner application chat operations. 

The application uses Google Firebase as an authentication service to make the application more secure. 


## To Migrate/Seed Database
Create your own .local.env as well as run the migration file 1st then the second run the seed.sql file. If you wish to see and test the Archive functionality then run the testArchive.sql file last.


*Major issues*: does not support web sockets

## App deployment on Render

The most efficient way to deploy THIS application is to use the [Render Platform](https://render.com). 
THIS application must be deployed as a web service, with the use of Next.js the server and front end are combined.  
Check out the [Render webservices documentation](https://render.com/docs/web-services)

*Potential Issues*: Darwin error. 
- Option 1: deleting node modules and packagelock.json and reinstalling them. 
*if that does not work*
- Option 2: [Stack overflow information](https://stackoverflow.com/questions/56103865/how-to-fix-unsupported-platform-for-fsevents1-2-9-wanted-osdarwin-arch)
