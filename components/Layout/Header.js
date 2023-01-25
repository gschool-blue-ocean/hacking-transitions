import Link from "next/link";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import style from "../../styles/LoginNew/Loginui.module.css";

const Header = ({ currentUser }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <header className={style.headerN}>
      <img className={style.galvanizeLogo} src="https://www.galvanize.com/wp-content/uploads/2022/11/galvanize_logo_small-scale_full-color_dark-background.png" alt="Galvanize Logo" />
        <div className={style.overlapGroup3}>
          <div className={style.orangeAccent}>
            <h1 className={style.title}>Hacking Transition</h1>
          </div>
        </div>
    </header>
    // <nav className={style.header}>
    //   <div className={style.topNav}>
    //     <ul className={style.topList}>
    //       <div className={style.listItem}>
    //         {/* {`${currentUser.first} ${currentUser.last}`} */}
    //         <Link href={"/admin/profile"} as={"/"} passHref>
    //             <a
    //               className={`${style.link} `}
    //             >{`${currentUser.first} ${currentUser.last}`}
    //             </a>
    //           </Link>
    //       </div>
    //       <Link href={"/"} passHref>
    //         <a
    //           className={`${style.link} `}
    //           onClick={() => {
    //             const auth = getAuth();
    //             localStorage.removeItem("currentUser");
    //             window.sessionStorage.removeItem("currentUser");
    //             signOut(auth).then(() => {
    //               // Sign-out successful.
    //               alert('You have succesfully logged out');
    //             }).catch((error) => {
    //               // An error happened.
    //               console.log(error);
    //             });
    //           }}
    //         >
    //           <div className={style.listItem}>Logout</div>
    //         </a>
    //       </Link>
    //     </ul>
    //   </div>
    //   <div className={style.bottomNav}>
    //     <div className={style.picCont}>
    //       <Link href={currentUser.admin ? '/admin' : '/student'} passHref>
    //         <img
    //           src="https://www.galvanize.com/wp-content/uploads/2022/11/galvanize_logo_small-scale_full-color_dark-background.png"
    //           alt="galvanizeLogo"
    //           className={style.logo}
    //         ></img>
    //       </Link>
    //     </div>
    //     <h1 className={style.title}>Hacking Transitions</h1>
    //     <div className={style.pages}>
    //       {currentUser.admin && (
    //         <>
    //           <Link href={"/admin"} as={"/"} passHref>
    //             <a
    //               className={`${style.link} ${
    //                 pathname === "/admin" && style.active
    //               }`}
    //             >
    //               <li className={style.page}>Home</li>
    //             </a>
    //           </Link>
    //           <Link href={"/admin/archive"} as={"/"} passHref>
    //             <a
    //               className={`${style.link} ${
    //                 pathname === "/admin/archive" && style.active
    //               }`}
    //             >
    //               <li className={style.page}>Archive</li>
    //             </a>
    //           </Link>
    //           <Link href={"/admin/edit"} as={"/"} passHref>
    //             <a
    //               className={`${style.link} ${
    //                 pathname === "/admin/edit" && style.active
    //               }`}
    //             >
    //               <li className={style.page}>Admin</li>
    //             </a>
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Header;
