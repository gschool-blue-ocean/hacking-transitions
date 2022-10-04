import react, { useState } from 'react'
import ReactDOM from 'react-dom'

const EditStudentModal = ({ userData, setUserData, activeStudent, setActiveStudent, setShowEditStudentModal }) => {

    const [formData, setFormData] = useState({
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
        interests: activeStudent.interests
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

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://hacking-transition.herokuapp.com/api/admin/edit/student/${activeStudent.user_id}`, {
            method: 'PATCH',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(() => {
                setActiveStudent((prevData) => {
                    return {
                        ...prevData,
                        ...formData
                    }
                })
            })
            .then(() => {
                setUserData((prevData) => {
                    return {
                        ...prevData,
                        ...formData
                    }
                })
            })

            .then(() => setShowEditStudentModal(false))
            .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        if (e.target.type === "checkbox") {
            return setFormData((prevData) => {
                return {
                    ...prevData,
                    [e.target.name]: e.target.checked
                }
            })
        }

        setFormData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleCancel = () => {
        setShowEditStudentModal(false)
    }

    return ReactDOM.createPortal(
        <div className='portalContainer'>
            <div className='addStudentModal'>
                <h4 className='editStudentFormTitle'>Edit student information</h4>

                <form className="addStudentForm" onSubmit={handleSubmit}>
                    <div className='editStudentFormInputs'>
                        <label>First
                            <input
                                id='editStudentFirstName'
                                required
                                className='addStudentFormInput'
                                type='text'
                                placeholder="Student First name"
                                onChange={handleChange}
                                name='first'
                                value={formData.first} /></label>


                        <label>Last
                            <input
                                required
                                className='addStudentFormInput'
                                type='text'
                                placeholder="Student Last name"
                                onChange={handleChange}
                                name='last'
                                value={formData.last} />
                        </label>

                        <label>Email
                            <input
                                required
                                className='addStudentFormInput'
                                type='email'
                                placeholder="Student Email Address"
                                onChange={handleChange}
                                name='email'
                                value={formData.email} />
                        </label>

                        <label>Rank
                            <input
                                required
                                className='addStudentFormInput'
                                type='text'
                                placeholder="Student Rank"
                                onChange={handleChange}
                                name='rank'
                                value={formData.rank} />
                        </label>

                        <label>Branch
                            <input
                                required
                                className='addStudentFormInput'
                                type='text'
                                placeholder="Student Branch of Service"
                                onChange={handleChange}
                                name='branch'
                                value={formData.branch} />
                        </label>

                        <label>Duty Station
                            <input
                                required
                                className='addStudentFormInput'
                                type='text'
                                placeholder="Student Duty Station"
                                onChange={handleChange}
                                name='duty_station'
                                value={formData.duty_station} />
                        </label>

                        <label>Leave start date
                            <input
                                required
                                className='addStudentFormInput editStudentDate'
                                type='date'
                                onChange={handleChange}
                                name='leave_start_date'
                                value={formData.leave_start_date} />
                        </label>

                        <label>ETS date
                            <input
                                required
                                className='addStudentFormInput editStudentDate'
                                type='date'
                                onChange={handleChange}
                                name='ets_date'
                                value={formData.ets_date} />
                        </label>

                        <label>City
                            <input
                                required
                                className='addStudentFormInput'
                                type='text'
                                placeholder="Student City"
                                onChange={handleChange}
                                name='city'
                                value={formData.city} />
                        </label>

                        <label>State
                            <input
                                required
                                className='addStudentFormInput'
                                type='text'
                                placeholder="Student State"
                                onChange={handleChange}
                                name='state'
                                value={formData.state} />
                        </label>

                        <label>Highest education
                            <input
                                required
                                className='addStudentFormInput'
                                type='text'
                                placeholder="Student highest education"
                                onChange={handleChange}
                                name='highest_education'
                                value={formData.highest_education} />
                        </label>

                        <label>Military Occupation
                            <input
                                required
                                className='addStudentFormInput'
                                type='text'
                                placeholder="Student Military occupation"
                                onChange={handleChange}
                                name='mos'
                                value={formData.mos} /></label>

                        <label className='checkboxLabel'>
                            <input
                                type='checkbox'
                                name='seeking_further_education'
                                onChange={handleChange}
                                checked={formData.seeking_further_education}
                            /> Seeking further education?</label>

                        <label className='checkboxLabel'>
                            <input
                                type='checkbox'
                                name='planning_to_relocate'
                                onChange={handleChange}
                                checked={formData.planning_to_relocate}
                            /> Planning to relocate?</label>


                        <label className='checkboxLabel'>
                            <input
                                type='checkbox'
                                name='taps_complete'
                                onChange={handleChange}
                                checked={formData.taps_complete}
                            /> Taps complete?</label>

                        <label className='checkboxLabel'>
                            <input
                                type='checkbox'
                                name='has_dependents'
                                onChange={handleChange}
                                checked={formData.has_dependents}
                            /> Have dependents?</label>
                    </div>

                    {userData.admin ? null : <div className='myInterestsDiv'>
                        <label>My interests:</label>
                        <textarea
                            className='editInterestsTextarea'
                            type='text'
                            onChange={handleChange}
                            name='interests'
                            value={formData.interests} />
                    </div>}


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

        </div >,
        document.getElementById('portal')
    )
}

export default EditStudentModal