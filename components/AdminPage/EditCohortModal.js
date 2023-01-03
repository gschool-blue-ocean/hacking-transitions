import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineEdit } from 'react-icons/ai';
import axios from "axios";
import style from "../../styles/Edit.Admin.module.css"
import { useRouter } from "next/router"; 


const Example = ({ cohort, setCurrCohort }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [cohortName, setCohortName] = useState("")
    const [cohortStartDate, setCohortStartDate] = useState("")
    const [cohortEndDate, setCohortEndDate] = useState("")

    const router = useRouter(); 

    let cohortDataName = ""
    let cohortDataStartDate = ""
    let cohortDataEndDate = ""

    axios.get(`api/cohorts/${cohort.cohort_id}`, {}).then((res) => {
        // console.log("this is my single data", res.data.start_date)
        res.data.map((editData) => {

            cohortDataName = (editData.cohort_name)
            cohortDataStartDate = (editData.start_date)
            cohortDataEndDate = (editData.end_date)
        })
    })

    const editCohort = (event) => {
        axios.patch(`/api/cohorts/${cohort.cohort_id}`, {
            cohort_name: cohortName,
            start_date: cohortStartDate,
            end_date: cohortEndDate,
            active: true,
            archived: false
        })
        window.alert("Edit completed")
        window.location.reload()
        router.push("/admin");
    }

    const deleteCohort = (event) => {
        axios.delete(`/api/cohorts/${cohort.cohort_id}`, {
        })
        window.alert("Cohort deleted!")
        window.location.reload()
        router.push("/admin");
    }

    const archiveCohort = (event) => {
        axios.patch(`/api/cohorts/${cohort.cohort_id}`, {
            cohort_name: cohortDataName,
            start_date: cohortDataStartDate,
            end_date: cohortDataEndDate,
            active: false,
            archived: true
        })
        window.alert("Cohort Archived!")
        window.location.reload()
        router.push("/admin");
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
                        <div className={style.cohortNameDiv}>
                            <label>
                                Cohort Name:
                            </label>
                            <input type="text"
                                placeholder="MCSP-XX"
                                onChange={(event) => setCohortName(event.target.value)}
                                value={cohortName}
                                required />
                        </div>

                        <div className={style.startDateDiv}>
                            <label>
                                Start Date:
                            </label>
                            <input type="text"
                                placeholder="mm/dd/yyyy"
                                onChange={(event) => setCohortStartDate(event.target.value)}
                                value={cohortStartDate}
                                required />
                        </div>

                        <div className={style.endDateDiv}>
                            <label>
                                End Date:
                            </label>
                            <input type="text"
                                placeholder="mm/dd/yyyy"
                                onChange={(event) => setCohortEndDate(event.target.value)}
                                value={cohortEndDate}
                                required />
                        </div>
                    </form>
                    <Button className={style.archiveButton} variant="warning" onClick={archiveCohort}>
                        Archive Cohort
                    </Button>
                    <div className={style.deleteButtonDiv}>
                        <Button className={style.deleteButton} variant="danger" onClick={deleteCohort}>
                            Delete Cohort
                        </Button>
                    </div>



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
