import s from "../../styles/AdminHomePage/CohortFilterTable.module.css";
import { getDaysToEts, useSortableData } from "../../utility";
import Link from "next/link";
import etsStyle from "../../styles/StudentPage.module.css";
import { useDispatch } from "react-redux";
import App from "./EditStudentModal";
import { motion } from "framer-motion";
import { setActiveStudent } from "../../redux/features/app-slice";

//CohortFitlerTable renders the content of the table the mapping over the students information of each selected Cohort

const CohortFilterTable = ({ setCurrCohort, currCohort, clickedCohort, setClickedCohort, cohort, setChatCohort})=>{


  
  const dispatch = useDispatch();
      return (
                       <>
                        {cohort.students.map((student) => {

                          let todayDate = new Date();
                          let etsDate = new Date(student.ets_date);
      
                          let Difference_In_Time = etsDate.getTime() - todayDate.getTime();
                          let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


                          return (
                            <motion.tr
                              whileHover={{ backgroundColor: "#F5F5F5" }}
                              className={s.tr}
                              key={student.user_id}
                              onClick={() => {
                                dispatch(setActiveStudent(student));
                                //dispatch(setStudentsForCohortChat([]));
                              }}
                            >
                              <LinkToViewStudent className={s.studentElement} id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{student.first}</btn>
                                </td>
                              </LinkToViewStudent>

                              <LinkToViewStudent className={s.studentElement} id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{student.last}</btn>
                                </td>
                              </LinkToViewStudent>
                              
                              <LinkToViewStudent className={s.studentElement} id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{student.branch}</btn>
                                </td>
                              </LinkToViewStudent>

                              <LinkToViewStudent className={s.studentElement} id={cohort.cohort_id}>
                                  <td>
                                    <btn className={s.td}>{student.ets_date}</btn>
                                  </td>
                              </LinkToViewStudent>

                              <LinkToViewStudent className={s.studentElement} id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{Math.round(Difference_In_Days)}</btn>
                                </td>
                              </LinkToViewStudent>

                              <LinkToViewStudent className={s.studentElement} id={cohort.cohort_id}>
                                <td>
                                  <btn className={s.td}>{student.leave_start_date}</btn>
                                </td>
                              </LinkToViewStudent>

                              

                              <td>
                                <div>
                                  <App
                                    cohort_id={student.cohort_id}
                                    setClickedCohort={setClickedCohort}
                                    clickedCohort={clickedCohort}
                                    setCurrCohort={setCurrCohort}
                                    student_id={student.user_id}
                                    currCohort={currCohort}
                                  />
                                </div>
                              </td>
{/* 
                              <td>
                                 <button
                                  className={`${s.chatBtn} ${s.td}`}
                                  onClick={() => {
                                    dispatch(setActiveStudent(student));
                                    dispatch(setStudentsForCohortChat([]));
                                    setChatCohort(student.first +' ' + student.last.substring(0,1) + '.')
                                  }}
                                >
                                  <BsChatText />
                                </button> 
                              </td> */}
                            </motion.tr>
                            );
                        })}
                    </> 
       )
}
export default CohortFilterTable 

// Defines reusable function that wraps each student row elements to navigate to their student page when clicked
const LinkToViewStudent = ({ children, id }) => {
  const link = "/admin/viewstudent";
  return (
    <>
      <Link as="/admin" href={{ pathname: link, query: { id } }}>
        {children}
      </Link>
    </>
  );
};
