# HACKING TRANSITIONS 
![CRUD Lords image](../next-transition-tracker/readme_Images/computer-hacking.jpeg)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Contributors 
- [Ilsa Hampton]() - Project Manager 
- [Edward Sabbatino]() / [Justin Melendez]() - UI/UX Design Team
- [Paul McDonald]() / [Moses Valerio]() - System Architecture Design Team
- [Kameron Wescott]() - Login Page Team
- [Drake Leslie]() / [Jacob Walters]() - Admin Section Team
- [John Welle]() / [Matthew Mickler]() - Student Section Team

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

- React
- Next.js 
- PSQL 
- Redux 
- Javascript 
- CSS
- Socket.io

## Technical Challenges

- The largest technical challenge the team encounted was restructuring the entire application from `vanilla React` to React using `Next.js` 

- One of the biggest learing points during this project was being able to look at legecy code, tear it down to the bare bones and rebuild it from the ground up with several unconnected components, then bringing them all together to make it mesh into a full functioning, fluid application. 

## Unexpected Challenges


## How does the *Hacking Transitions* application work?

The application has a dedicated `Front-end` framework utilizing [React]() and [Next.js]() and managable state using [Redux](). All of the styling is done through `CSS`. This allows the user to make all the `CRUD` operation calls to the dedicated `Back-end` using [PSQL]().  

The application utilizes [socket.io]() to conduct inner application chat operations. 



## To establish the back end
you will need to create your own .local.env as well as run the migration file 1st then the second run the seed.sql file. If you wish to see and test the Archive functionality then run the testArchive.sql file last.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

*Major issues*: does not support web sockets so chat function wont work

## App deployment on Render

The most efficient way to deploy this application is to use the [Render Platform](https://render.com). 

Check out the [Render webservices documentation](https://render.com/docs/web-services)

*Potential Issues*: Darwin error. 
- Option 1: deleting node modules and packagelock.json and reinstalling them. 
*if that does not work*
- Option 2: [Stack overflow information](https://stackoverflow.com/questions/56103865/how-to-fix-unsupported-platform-for-fsevents1-2-9-wanted-osdarwin-arch)
