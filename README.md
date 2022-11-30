# HACKING TRANSITIONS 

[Deployed Site](galvanize-transitions.onrender.com)

- To access admin portal use: Password/Username: 'admin4'
- To access student portal use: Password/Username: 'student4'

[MCSP-13 Presentation](https://drive.google.com/file/d/1t4cZxz5oCqSZG4gyADg2ADRblIMQFjSB/view?usp=share_link)

## Contributors 

- [Ilsa Hampton](https://github.com/ilsaann) - Project Manager 
- [Edward Sabbatino](https://github.com/EntropicWind) / [Justin Melendez](https://github.com/CountDown2Extinction) - UI/UX Design Team
- [Paul McDonald](https://github.com/pmcdonald1012) / [Moses Valerio](https://github.com/moses369) - System Architecture Design Team
- [Kameron Wescott](https://github.com/Kamwescott) - Login Page Team
- [Drake Leslie](https://github.com/drakeleslie) / [Jacob Walters](https://github.com/JacobDWalters) - Admin Section Team
- [John Welle](https://github.com/Johnwelle11) / [Matthew Mickler](https://github.com/m-mickler) - Student Section Team

## What is the *Hacking Tranistions* Application?

Hacking transitions was a `10 person group project`. This project was a brief `1-week sprint` where our team tried to complete an MVP for an external user *Mag Rosario*.

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

## Technical Challenges

- The largest technical challenge the team encounted was restructuring the entire application from `vanilla React` to React using `Next.js` 

- One of the biggest learing points during this project was being able to look at legecy code, tear it down to the bare bones and rebuild it from the ground up with several unconnected components, then bringing them all together to make it mesh into a full functioning, fluid application. 


## How does the *Hacking Transitions* application work?

The application has a dedicated `Front-end` framework utilizing [React]() and [Next.js]() and managable state using [Redux](). All of the styling is done through `CSS`. This allows the user to make all the `CRUD` operation calls to the dedicated `Back-end` using [PSQL]().  

The application utilizes [socket.io]() to conduct inner application chat operations. 


## To Migrate/Seed Database
Create your own .local.env as well as run the migration file 1st then the second run the seed.sql file. If you wish to see and test the Archive functionality then run the testArchive.sql file last.


## App deployment on Vercel

The easiest way to deploy a Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) 

*Major issues*: does not support web sockets

## App deployment on Render

The most efficient way to deploy THIS application is to use the [Render Platform](https://render.com). 

Check out the [Render webservices documentation](https://render.com/docs/web-services)

*Potential Issues*: Darwin error. 
- Option 1: deleting node modules and packagelock.json and reinstalling them. 
*if that does not work*
- Option 2: [Stack overflow information](https://stackoverflow.com/questions/56103865/how-to-fix-unsupported-platform-for-fsevents1-2-9-wanted-osdarwin-arch)
