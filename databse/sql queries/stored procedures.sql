
--stored procedure for inserting new user/ signup
CREATE OR ALTER PROCEDURE users.InsertUserData
    @fullNames VARCHAR(50),
    @userName VARCHAR(50),
    @email VARCHAR(50),
    @hashedPwd VARCHAR(100),
    @phoneNumber VARCHAR(50),
    @imgUrl VARCHAR(200),
    @bio VARCHAR(MAX),
    @location VARCHAR(50),
    @registrationDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO users.UsersData (fullNames, userName, email, hashedPwd, phoneNumber, imgUrl, bio, location, registrationDate)
    VALUES (@fullNames, @userName, @email, @hashedPwd, @phoneNumber, @imgUrl, @bio, @location, @registrationDate);
END;

--stored procedure for login or getting user by phone number
CREATE OR ALTER PROCEDURE users.getUserByPhone(
@phoneNumber VARCHAR(20)
)
AS
BEGIN
SELECT* FROM users.UsersData WHERE phoneNumber=@phoneNumber
END
GO


CREATE OR ALTER PROCEDURE GetUserProfile
    @userName VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT fullNames, userName, email, imgUrl, bio
    FROM users.UsersData
    WHERE userName = @userName;
END;

EXEC GetUserProfile @userName="kim"

SELECT fullNames, userName, email, imgUrl, bio FROM users.UsersData WHERE userName = 'kim'

select * from users.UsersData

CREATE OR ALTER PROCEDURE UpdateUserProfile
  @userName VARCHAR(50),
  @fullNames VARCHAR(100),
  @email VARCHAR(100),
  @imgUrl VARCHAR(255),
  @bio VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  UPDATE users.UsersData
  SET fullNames = @fullNames,
      email = @email,
      imgUrl = @imgUrl,
      bio = @bio
  WHERE userName = @userName;
END;

EXEC UpdateUserProfile
  @userName = 'njoro',
  @fullNames = 'your_full_name',
  @email = 'your_email',
  @imgUrl = 'your_image_url',
  @bio = 'your_bio'


  CREATE TABLE likes (
  id INT PRIMARY KEY IDENTITY(1,1),
  post_id INT NOT NULL ,
  user_id INT NOT NULL,
  created_at DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (post_id) REFERENCES users.posts(post_id),
  FOREIGN KEY (user_id) REFERENCES users.UsersData(id)
);

SELECT * FROM users.posts
SELECT * FROM likes

CREATE TRIGGER update_post_likes ON likes AFTER INSERT
AS
BEGIN
  UPDATE users.posts SET likes = likes + 1 WHERE post_id = (SELECT post_id FROM inserted);
END;


CREATE PROCEDURE insert_like
  @post_id INT,
  @user_id INT
AS
BEGIN
  INSERT INTO likes (post_id, user_id) VALUES (@post_id, @user_id);
END;


CREATE TABLE comments (
  id INT PRIMARY KEY IDENTITY(1,1),
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (post_id) REFERENCES users.posts(post_id),
  FOREIGN KEY (user_id) REFERENCES users.UsersData(id)
);

CREATE PROCEDURE insert_comment
  @post_id INT,
  @user_id INT,
  @content VARCHAR(255)
AS
BEGIN
  INSERT INTO comments (post_id, user_id, content) VALUES (@post_id, @user_id, @content);
END;

CREATE TRIGGER update_post_comments ON comments AFTER INSERT
AS
BEGIN
  UPDATE users.posts SET comments = comments + 1 WHERE post_id = (SELECT post_id FROM inserted);
END;

CREATE TABLE comment_replies (
  id INT PRIMARY KEY IDENTITY(1,1),
  comment_id INT NOT NULL,
  user_id INT NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (comment_id) REFERENCES comments(comment_id),
  FOREIGN KEY (user_id) REFERENCES users.UsersData(id)
);


ALTER TABLE comments
  DROP CONSTRAINT PK__comments__3213E83F502D755B;

EXEC sp_rename 'comments.id', 'comment_id', 'COLUMN';

ALTER TABLE comments
  ADD CONSTRAINT PK__comments__3213E83F502D755B PRIMARY KEY (comment_id);

  select * from comments
  SELECT name, type_desc
FROM sys.objects
WHERE parent_object_id = OBJECT_ID('comments')
  AND type_desc LIKE '%CONSTRAINT';

  CREATE PROCEDURE InsertCommentReply
  @comment_id INT,
  @user_id INT,
  @content VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  INSERT INTO comment_replies (comment_id, user_id, content)
  VALUES (@comment_id, @user_id, @content);
END;

CREATE PROCEDURE users.deleteUser
    @userName VARCHAR(255)
AS
BEGIN
    UPDATE users.UsersData
    SET is_deleted = 1
    WHERE userName = @userName;
END;

EXEC users.deleteUser @userName = 'johndoe';
select* from users.UsersData

CREATE PROCEDURE GetAllPosts
AS
BEGIN
    SELECT *
    FROM users.posts;
END;

select * from comments
select * from likes
select * from comment_replies



CREATE PROCEDURE CheckUsernameExistence
  @userName VARCHAR(255)
AS
BEGIN
  SELECT COUNT(*) AS count
  FROM users.UsersData
  WHERE username = @userName;
END;

CREATE PROCEDURE GetUserByUsername
  @userName VARCHAR(255)
AS
BEGIN
  SELECT *
  FROM users.UsersData
  WHERE username = @userName;
END;

select * from users.followers

CREATE PROCEDURE DeleteFollower
  @follower_id INT,
  @following_id INT
AS
BEGIN
  DELETE FROM users.followers
  WHERE follower_id = @follower_id AND following_id = @following_id;
END;

ALTER PROCEDURE [dbo].[sp_get_following]
	@user_id INT
AS
BEGIN
	SELECT u.fullNames, u.userName
	FROM users.followers f
	JOIN users.UsersData u ON f.following_id = u.id
	WHERE f.follower_id = @user_id;
END;

select* from users.UsersData

ALTER PROCEDURE [dbo].[UpdateUserProfile]
  @userName VARCHAR(50),
  @fullNames VARCHAR(100),
  @email VARCHAR(100),
  @imgUrl VARCHAR(255),
  @bio VARCHAR(255)
AS
BEGIN
  UPDATE users.UsersData
  SET fullNames = @fullNames,
      email = @email,
      imgUrl = @imgUrl,
      bio = @bio
  WHERE userName = @userName;

  SELECT @@ROWCOUNT AS affectedRows;
END;

CREATE PROCEDURE [dbo].[SearchUserByUsername]
  @username VARCHAR(50)
AS
BEGIN
  SELECT username, fullNames
  FROM users.UsersData
  WHERE username = @username;
END;

-- Stored procedure for changing password
CREATE PROCEDURE [dbo].[ChangePassword]
  @userId INT,
  @newPassword VARCHAR(255)
AS
BEGIN
  UPDATE users.UsersData
  SET hashedPwd = @newPassword
  WHERE id = @userId;
END;
GO

CREATE PROCEDURE [dbo].[GetUserPasswordById]
  @userId INT
AS
BEGIN
  SELECT hashedPwd
  FROM users.UsersData
  WHERE id = @userId;
END;

-- Step 1: Alter table to add the "username" field
ALTER TABLE comments
ADD username VARCHAR(50) NOT NULL;

-- Step 2: Update the foreign key constraint to reference the "username" field
ALTER TABLE comments
DROP CONSTRAINT FK_comments_user_id;

ALTER TABLE comments
ADD CONSTRAINT FK_comments_username
FOREIGN KEY (username) REFERENCES users.UsersData(username);

-- Step 1: Add a nullable column for the username
ALTER TABLE comments
ADD username VARCHAR(50) NULL;

--Step 2: Update the column with the appropriate username values
UPDATE comments
SET username = (SELECT username FROM users.UsersData WHERE id = comments.user_id);

-- Step 3: Modify the column to be non-nullable
ALTER TABLE comments
ALTER COLUMN username VARCHAR(50) NOT NULL;

ALTER TABLE comments
DROP CONSTRAINT FK_comments_user_id;

ALTER TABLE comments
ADD CONSTRAINT FK_comments_username
FOREIGN KEY (username) REFERENCES users.UsersData(username);


select * from comments

select * from dbo.notifications








select * from users.UsersData

