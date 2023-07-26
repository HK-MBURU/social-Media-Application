import "./notifications.css";
import RSidenav from "../navigation/reusableNav/RSidenav";
import Notification from "./Notification";
import React, { useEffect, useState } from "react";
import { Container, ListGroup, Badge, Button } from "react-bootstrap";
import { FaBell, FaCheckCircle, FaComment } from "react-icons/fa";
import axios from "axios";


function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Like",
      message: "John liked your post.",
      isRead: false,
    },
    {
      id: 2,
      type: "Comment",
      message: "Jane commented on your photo.",
      isRead: true,
    },
  ]);

  useEffect(() => {
    // Fetch notifications from the endpoint using Axios
    axios
      .get('http://localhost:50050/getNotifications')
      .then((response) => {
        setNotifications(response.data.results); // Assuming the notifications are in the 'results' property of the response
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);
  

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  return (
  <div className="notifications text-bg-dark wholeBody">
    <RSidenav />
    <Container className=" text-bg-dark wholeBody ">
      
      <div className="mt-4">
        <h2 className="my-4 ">Notifications</h2>
      </div>

      <ListGroup>
        {notifications.map((notification) => (
          <ListGroup.Item
            key={notification.id}
            variant={notification.isRead ? "light" : "info"}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              {notification.type === "Like" ? (
                <FaBell className="mr-2" />
              ) : (
                <FaComment className="mr-2" />
              )}
              {notification.message}
            </div>
            {!notification.isRead && (
              <Button
                variant="success"
                size="sm"
                onClick={() => markAsRead(notification.id)}
              >
                Mark as Read
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>

  </div>
    
  );
}

// export default NotificationPage;

{
  /* <div className="container">
        <div className="header">
          <RSidenav />
        </div>
        <div className="notificationContent">
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            

          
          </div>
        </div> */
}
// </div>
// );
// }

export default Notifications;
