CREATE TABLE users.posts(
post_id INT IDENTITY(1,1) PRIMARY KEY,
user_id INT NOT NULL,
content VARCHAR(255) NOT NULL,
image_url VARCHAR(255) NOT NULL,
video_url VARCHAR(255),
created_at DATETIME NOT NULL DEFAULT GETDATE(),
likes INT DEFAULT 0,
comments INT DEFAULT 0,
shares INT DEFAULT 0,
FOREIGN KEY(user_id)REFERENCES users.UsersData(id)
);
DROP TABLE users.posts
SELECT * FROM users.posts

--stored procedure forinserting data ino the above table
CREATE OR ALTER PROCEDURE InsertPost
@user_id INT,
@content VARCHAR(255),
@image_url VARCHAR(255)=NULL,
@video_url VARCHAR(255)=NULL,
@likes INT=0,
@comments INT =0,
@shares INT=0

AS
BEGIN
INSERT INTO users.posts(user_id,content,image_url,video_url,likes,comments,shares)
VALUES (@user_id,@content,@image_url,@video_url, @likes,@comments,@shares)
END

--testing the storedprocedure
EXEC InsertPost
    @user_id = 1,
    @content = 'This is a sample post',
    @image_url = 'https://example.com/image.jpg',
    @likes = 10,
    @comments = 5,
    @shares = 2;


	--creating the followes table
	CREATE TABLE users.followers(
	follower_id INT NOT NULL,
	following_id INT NOT NULL,
	created_at DATETIME NOT NULL DEFAULT GETDATE(),
	FOREIGN KEY (follower_id) REFERENCES users.UsersData(id),
	FOREIGN KEY (following_id) REFERENCES users.UsersData(id),
	PRIMARY KEY (follower_id,following_id)
	)


	--procedure for inserting data into the above table
	CREATE PROCEDURE InsertFollower
	@follower_id INT,
	@following_id INT

	AS
	BEGIN
	INSERT INTO users.followers(follower_id,following_id,created_at)
	VALUES (@follower_id,@following_id,GETDATE())
	END

	--testing the procedure
	EXEC InsertFollower @follower_id = 1, @following_id = 3;

	SELECT * FROM users.UsersData
	SELECT * FROM users.followers

	--table for notification
	CREATE TABLE notifications(
	notification_id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT NOT NULL,
	notification_type VARCHAR(255) NOT NULL,
	source_id INT NOT NULL,
	is_read  BIT NOT NULL DEFAULT 0,
	created_at DATETIME NOT NULL DEFAULT GETDATE(),
	FOREIGN KEY (user_id) REFERENCES users.UsersData(id)
	)

	--procedure for inserting data in the above table
	CREATE OR ALTER PROCEDURE InsertNotification
    @user_id INT,
    @notification_type VARCHAR(255),
    @source_id INT
AS
BEGIN
    INSERT INTO notifications (user_id, notification_type, source_id)
    VALUES (@user_id, @notification_type, @source_id);
END;
	--TESTING THE PROCEDURE

	EXEC InsertNotification @user_id = 1, @notification_type = 'friend request', @source_id = 2;

	SELECT * FROM notifications
