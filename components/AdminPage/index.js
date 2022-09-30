import s from '../../styles/AdminPage.module.css'
const AdminContainer = () => {
  return (
    <div className={s.container}>
      <div className={s.menucontainer}> 
        <div className={s.menutitle}>
         Cohorts
        </div>
        <div className={s.cohortsmenu}> </div>
      </div>
      
    </div>
  )
}

export default AdminContainer