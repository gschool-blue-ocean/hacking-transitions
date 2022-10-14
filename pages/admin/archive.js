import React from "react";
import ArchivePage from "../../components/Archive";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { checkLogin } from "../../utility";
import { setActiveStudent } from "../../redux/features/app-slice";

export default function Archive() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    (async () => {
      const user = await checkLogin();
      console.log(user);

      if (user === null) {
        router.push("/");
      } else if (user !== "admin") {
        dispatch(
          setActiveStudent(JSON.parse(sessionStorage.getItem("currentUser")))
        );
        router.push("/student");
      } else {
        setAdmin(true);
      }
    })();
  }, []);
  return (
    admin && (
      <div>
        <ArchivePage />
      </div>
    )
  );
}
