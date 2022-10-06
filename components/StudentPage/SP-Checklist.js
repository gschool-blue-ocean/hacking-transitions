import react, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from "../../styles/StudentPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { server } from '../../utility';
import { setCurrentUser, setActiveStudent } from '../../redux/features/app-slice';


const SPChecklist = ({ setShowEditStudentModal }) => {
    const dispatch = useDispatch();
    const { userData, activeStudent } = useSelector(({app: {currentUser, activeStudent}}) => ({userData: currentUser, activeStudent}))

    const handleCancel = () => {
        console.log('canceled')
    }
    const handleSubmit = () => {
        console.log('submit')
    }
    const handleChange = () => {
        console.log('change')
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
                                // checked={formData.seeking_further_education}
                            /> Seeking further education?</label>
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