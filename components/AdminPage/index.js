import s from '../../styles/AdminPage.module.css'
const AdminContainer = () => {
  const cohorts = [
    'MCSP-11',
    'MCSP-12',
    'MCSP-13',
    'MCSP-14',
    'MCSP-15'
  ]
  const handleClick = () => {
    console.log('click')
  }
  return (
    <div className={s.container}>
      <div className={s.menucontainer}> 
        <div className={s.menutitle}>
         Cohorts
        </div>
        <div className={s.cohortsmenu}> 
          <ul>
            {cohorts.map(cohort => {return (
                <li className={s.listitem}>
                  <btn className={s.cohortbtn} onClick={handleClick}>{cohort}</btn>
                </li>
            )}
            )}
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default AdminContainer