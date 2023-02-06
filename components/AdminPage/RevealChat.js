import s from "../../styles/AdminHomePage/AdminRevealChat.module.css";
import { motion } from "framer-motion";
import Chat from "../Chat";
import { useState } from "react";
const RevealChat = ({ chatCohort }) => {
  const [isClicked, toggleClicked] = useState(true);
  const toggleClickedMenu = () => {
    toggleClicked(!isClicked);
  };
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      x: 0,
      // rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      x: 0,
      // rotateX: -15,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };
  return (
    <div className={s.container}>
      <div className={s.h1}>
        <motion.btn onClick={toggleClickedMenu} className={s.titlebtn}>
          {!chatCohort && <span>Chat</span>}
          {chatCohort && <span className={s.cohortName}> {chatCohort}</span>}
        </motion.btn>
      </div>
      <div className={s.chatBoxContainer}>
        <motion.div
          initial="enter"
          animate={isClicked ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <motion.btn>
              <motion.div className={s.chatbox}>
                <Chat />
              </motion.div>
            </motion.btn>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RevealChat;
{
  /* <div>
<btn className={s.container}>
   <div className={s.h1}>Create</div>
</btn>
<motion.div className={s.chatbox}>
     <Chat />
</motion.div>
</div> */
}
