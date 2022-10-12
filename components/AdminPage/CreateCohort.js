import s from '../../styles/CreateCohort.module.css'
const CreateCohort = () => {
  ///*****ADD ONCLICK FEATURES  **********/
  return (
    <div>
      <btn className={s.container}>
          <div className={s.h1}>Create</div>
      </btn>
      <btn className={s.container}>
          <div className={s.h1}>Archived</div>
      </btn>
    </div>
  )
}

export default CreateCohort