SELECT * FROM notifications
CREATE TABLE friend_request(
from_uid INTEGER,
to_uid INTEGER,
is_accepted INTEGER
);

/* The friend_request table has three columns: from_uid, **to_uid**, and **is_accepted**¹. 

- **from_uid**: This column represents the user who sent the friend request.
- **to_uid**: This column represents the user who received the friend request.
- **is_accepted**: This column represents whether the friend request has been accepted or not. If the value is 0, it means that the request is still pending. If the value is 1, it means that the request has been accepted².
*/

--stored procedure for friend request
CREATE PROCEDURE sp_add_friend_request
@from_uid INTEGER,
@to_uid INTEGER,
@is_accepted INTEGER

AS 
BEGIN
INSERT INTO friend_request(from_uid,to_uid,is_accepted)
VALUES(@from_uid,@to_uid,@is_accepted)
END

--testing the procedure 
EXEC sp_add_friend_request @from_uid = 1, @to_uid = 2, @is_accepted = 0;
SELECT * FROM friend_request


--STORED PROCEDURE FOR DISPLAYING FRIENDS

CREATE OR ALTER PROCEDURE sp_display_friends
@id INTEGER
AS
BEGIN
SELECT u.*
FROM friend_request f
JOIN users.UsersData u ON f.to_uid=u.id
WHERE f.from_uid=@id AND f.is_accepted=1
END

--testing the procedure
EXEC sp_display_friends @id = 1;


--stored procedure for displaying friend requests
CREATE OR ALTER PROCEDURE sp_display_friend_requests
@id INTEGER
AS
BEGIN
SELECT u.*
FROM friend_request f
JOIN users.UsersData u ON f.from_uid=u.id
WHERE f.to_uid=@id AND f.is_accepted=0
END

--testing the procedure
EXEC sp_display_friend_requests @id = 1;
