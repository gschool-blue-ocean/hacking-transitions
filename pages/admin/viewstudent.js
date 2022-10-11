import { useRouter } from "next/router";
//******FOR VIEWING STUDENT INFORMATION WHILE LOGGED IN AS AN ADMIN ***********/

const viewstudent = () => {
  const id = useRouter().query;
  //id is the id being recieved from the page that the student was clicked
  //use id to query database/filter through state to recieve student info 
  return (
    <div>viewstudent  </div>
  )
}

export default viewstudent