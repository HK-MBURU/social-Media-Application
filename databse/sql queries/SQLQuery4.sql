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

SELECT * FROM users.UsersData



-- First, create a new table with the desired column name
CREATE TABLE users.UsersData_new (
    id INT IDENTITY(1,1) PRIMARY KEY,
    fullNames VARCHAR(50),
    userName VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    hashedPwd VARCHAR(100),  -- Changed column name to "hashedPwd"
    phoneNumber VARCHAR(50) UNIQUE,
    imgUrl VARCHAR(200),
    bio VARCHAR(MAX),
    location VARCHAR(50),
    registrationDate DATE
);

-- Copy the data from the old table to the new table
INSERT INTO users.UsersData_new (fullNames, userName, email, hashedPwd, phoneNumber, imgUrl, bio, location, registrationDate)
SELECT fullNames, userName, email, password, phoneNumber, imgUrl, bio, location, registrationDate
FROM users.UsersData;