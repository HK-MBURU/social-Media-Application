import { useNavigate } from "react-router-dom";



const handleLogOut = () => {
  const confirmed = window.confirm("Are you sure you want to logout");
  if (confirmed) {
    fetch("http://localhost:4040/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Logout succesful");
        //   navigate("/");
        } else {
          console.error("Logout failed:", response.status);
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }
};
export default handleLogOut