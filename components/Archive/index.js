import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

//goal for this component
//archive students button, puts checkboxes next to student names, can select students then push "OK"--> get message that student was archived
//archive cohort button, puts checkboxes next to cohorts, can select multiple then push "OK"--> get message that cohort is archived
//once state of "archived" should no longer display on other screens
//should have a display archived button

//now we only display the archived

//make the rows today row: archived| false until archived then PATCH request and change archived to TRUE

export default function ArchivePage() {
  //STATES NEEDED: global=> archived(student/cohort data), local=> checked(boolean), chooseCohorts(boolean), chooseStudents(boolean)

  return (
    <div className={style.container}>
      {/* create a side bar with Students, Cohorts, Archived*/}

      <div className="cohorts">
        Archived Cohorts
        <form>
          <input type="text" placeholder="Search Cohorts..." />
          <button type="submit">
            <HiOutlineSearch />
          </button>
        </form>
      </div>

      <div className="students">
        Archived Students
        <form>
          <input type="text" placeholder="Search Students..." />
          <button type="submit">
            <HiOutlineSearch />
          </button>
        </form>
      </div>
    </div>
  );
}
