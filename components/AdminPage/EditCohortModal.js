import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineEdit } from 'react-icons/ai';
import axios from "axios";

const Example = ({ cohort, setCurrCohort }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [cohortName, setCohortName] = useState("")
    const [cohortStartDate, setCohortStartDate] = useState("")
    const [cohortEndDate, setCohortEndDate] = useState("")

    console.log("in modal")

    // let existingCohortList = []
    // let startDate = ""
    // let endDate = ""

    axios.get(`api/cohorts/${cohort.cohort_id}`, {}).then((res) => {
        // console.log("this is my single data", res.data.start_date)
        res.data.map((editData) => {
            // setCohortName(editData.cohort_name)
            // setCohortStartDate(editData.start_date)
            // setCohortEndDate(editData.end_date)
            // console.log(editData.cohort_name, editData.start_date, editData.end_date)
        })
    })

    const editCohort = (event) => {
        // axios.get("/api/cohorts", {}).then((res) => {
        // console.log("this is the data", res.data)
        // res.data.map((cohortData) => {
        //     startDate = cohortData.start_date
        //     endDate = cohortData.end_date
        //     existingCohortList.push(cohortData.cohort_id)
        //     // console.log("THIS IS existing cohort", existingCohortList)
        //     // console.log(startDate)
        //     // console.log(endDate)
        // })
        // console.log(cohort.cohort_id)

        // if (existingCohortList.includes(cohort.cohort_id)) {
        // console.log("these match!")
        // axios.get(`api/cohorts/${cohort.cohort_id}`, {}).then((res) => {
        //     // console.log("this is my single data", res.data.start_date)
        //     res.data.map((editData) => {
        //         console.log("this is my start date", editData.start_date)
        //         setCohortStartDate(editData.start_date)
        //         setCohortEndDate(editData.end_date)
        //     })
        // })

        axios.patch(`/api/cohorts/${cohort.cohort_id}`, {
            cohort_name: cohortName,
            start_date: cohortStartDate,
            end_date: cohortEndDate,
        })

        window.alert("Edit completed")
        window.location.reload()

    }


    return (
        <>
            <Button variant="white" onClick={handleShow}>
                <AiOutlineEdit
                />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Edit Cohort {cohort.cohort_name}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <div>
                            <label>
                                Cohort Name:
                            </label>
                            <input type="text"
                                placeholder="MCSP-XX"
                                onChange={(event) => setCohortName(event.target.value)}
                                value={cohortName}
                                required />
                        </div>

                        <div>
                            <label>
                                Start Date:
                            </label>
                            <input type="text"
                                placeholder="mm/dd/yyyy"
                                onChange={(event) => setCohortStartDate(event.target.value)}
                                value={cohortStartDate}
                                required />
                        </div>

                        <div>
                            <label>
                                End Date:
                            </label>
                            <input type="text"
                                placeholder="mm/dd/yyyy"
                                onChange={(event) => setCohortEndDate(event.target.value)}
                                value={cohortEndDate}
                                required />
                        </div>

                        <Button variant="danger" onClick={handleClose}>
                            Delete Cohort
                        </Button>
                    </form>


                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editCohort}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;
