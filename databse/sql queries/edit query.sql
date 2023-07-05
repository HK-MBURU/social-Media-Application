ALTER TABLE users.UsersData
ADD is_deleted BIT DEFAULT 0;

DELETE FROM users.UsersData
WHERE is_deleted IS NULL;

-- Drop the existing foreign key constraint
ALTER TABLE users.posts
DROP CONSTRAINT FK_posts_user_id_UsersData;

-- Add the new foreign key constraint with cascading delete
ALTER TABLE users.posts
ADD CONSTRAINT FK_posts_user_id_UsersData
FOREIGN KEY (user_id)
REFERENCES users.UsersData (id)
ON DELETE CASCADE;

SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('users.posts')
  AND referenced_object_id = OBJECT_ID('users.UsersData');

  -- Drop the existing foreign key constraint
ALTER TABLE users.posts
DROP CONSTRAINT FK__posts__user_id__5535A963;

-- Add the new foreign key constraint with cascading delete
ALTER TABLE users.posts
ADD CONSTRAINT FK__posts__user_id__5535A963
FOREIGN KEY (user_id)
REFERENCES users.UsersData (id)
ON DELETE CASCADE;

-- Drop the existing foreign key constraint
ALTER TABLE users.followers
DROP CONSTRAINT FK_followers_followee_id_UsersData;

-- Add the new foreign key constraint with cascading delete
ALTER TABLE users.followers
ADD CONSTRAINT FK_followers_followee_id_UsersData
FOREIGN KEY (followee_id)
REFERENCES users.UsersData (id)
ON DELETE CASCADE;

SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('users.followers')
  AND referenced_object_id = OBJECT_ID('users.UsersData');

  -- Drop the existing foreign key constraint
ALTER TABLE users.followers
DROP CONSTRAINT FK__followers__follo__59FA5E80;

-- Add the new foreign key constraint with cascading delete
ALTER TABLE users.followers
ADD CONSTRAINT FK__followers__follo__59FA5E80
FOREIGN KEY (followee_id)
REFERENCES users.UsersData (id)
ON DELETE CASCADE;

-- Drop the existing primary key constraint
ALTER TABLE users.followers
DROP CONSTRAINT PK_followers;

CREATE TABLE users.followers(
	follower_id INT NOT NULL,
	following_id INT NOT NULL,
	created_at DATETIME NOT NULL DEFAULT GETDATE(),
	FOREIGN KEY (follower_id) REFERENCES users.UsersData(id),
	FOREIGN KEY (following_id) REFERENCES users.UsersData(id),
	PRIMARY KEY (follower_id,following_id)
	)









select * from users.UsersData

