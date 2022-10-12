import react, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from "../../styles/StudentPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { server } from '../../utility';
import { setCurrentUser, setActiveStudent } from '../../redux/features/app-slice';


const SPChecklist = ({ setShowEditStudentModal }) => {
    const dispatch = useDispatch();
    const { userData, activeStudent } = useSelector(({app: {currentUser, activeStudent}}) => ({userData: currentUser, activeStudent}))

    const [checklistData, setChecklistData] = useState({
        first: activeStudent.first,
        last: activeStudent.last,
        email: activeStudent.email,
        rank: activeStudent.rank,
        branch: activeStudent.branch,
        duty_station: activeStudent.duty_station,
        taps_complete: activeStudent.taps_complete,
        leave_start_date: convertDateToIso(activeStudent.leave_start_date),
        ets_date: convertDateToIso(activeStudent.ets_date),
        planning_to_relocate: activeStudent.planning_to_relocate,
        city: activeStudent.city,
        state: activeStudent.state,
        has_dependents: activeStudent.has_dependents,
        highest_education: activeStudent.highest_education,
        seeking_further_education: activeStudent.seeking_further_education,
        mos: activeStudent.mos,
        interests: activeStudent.interests,
        final_physical: activeStudent.final_physical,
        gear_turn_in: activeStudent.gear_turn_in,
        HHG_move: activeStudent.HHG_move,
        barracks_checkout: activeStudent.barracks_checkout,
        file_VA_claim: activeStudent.file_VA_claim
    })

    function convertDateToIso(date) {
        if (date == '') {
            return ''
        }
        if (date == null) {
            return ''
        }

        else if (date.split('-')[0].length === 4) {
            return date
        }

        else if (date.split('/')[0].length === 4) {
            return date
        }

        else {
            let newDate = new Date(date)
            let dateArray = newDate.toLocaleDateString().split('/')
            let year = dateArray[2]
            let day = dateArray[1].length === 2 ? dateArray[1] : `0${dateArray[1]}`
            let month = dateArray[0].length === 2 ? dateArray[0] : `0${dateArray[0]}`

            return `${year}-${month}-${day}`
        }
    }

    const handleCancel = () => {
        console.log('canceled', checklistData)
    }
    const handleSubmit = () => {
        e.preventDefault();
        console.log("submitted", checklistData);
        fetch(`/api/users/${activeStudent.user_id}`, {
            method: 'PATCH',
            body: JSON.stringify(checklistData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json()
            )
            .then(() => {
                setActiveStudent(checklistData)
                setCurrentUser(checklistData)
            })
            .catch(err => console.log(err))
    }
    
    const handleChange = (e) => {
        if (e.target.type === "checkbox") {
            return setChecklistData((prevData) => {
                return {
                    ...prevData,
                    [e.target.name]: e.target.checked
                }
            })
        }
    }

    return (
        <div className={styles.SDashChecklist}>
            <div className={styles.infoCardcontainer}>
                <h4 className='editStudentFormTitle'>Transition Checklist</h4>

                <form className="addStudentForm" onSubmit={handleSubmit}>
                    <div className='editStudentFormInputs'>
                        <label className='checkboxLabel'>
                            <input
                                type='checkbox'
                                name='seeking_further_education'
                                onChange={handleChange}
                                checked={checklistData.final_physical}
                            /> Seperation Physical Complete?</label>
                        <label className='checkboxLabel'>
                            <input
                                type='checkbox'
                                name='planning_to_relocate'
                                onChange={handleChange}
                                // checked={formData.planning_to_relocate}
                            /> Planning to relocate?</label>
                        <label className='checkboxLabel'>
                            <input
                                type='checkbox'
                                name='taps_complete'
                                onChange={handleChange}
                                // checked={formData.taps_complete}
                            /> Taps complete?</label>
                        <label className='checkboxLabel'>
                            <input
                                type='checkbox'
                                name='has_dependents'
                                onChange={handleChange}
                                // checked={formData.has_dependents}
                            /> Have dependents?</label>
                    </div>
                    <input
                        className='addStudentFormButton createStudent'
                        type='submit'
                        value='Update Student' />
                    <input
                        className='addStudentFormButton cancel'
                        onClick={handleCancel}
                        type='button'
                        value='Cancel' />
                </form>
            </div>
        </div>
    )
}

export default SPChecklist