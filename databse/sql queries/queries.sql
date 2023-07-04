--creating table
CREATE SCHEMA users
CREATE TABLE users.UsersData (
    id INT IDENTITY(1,1) PRIMARY KEY,
    fullNames VARCHAR(50),
    userName VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(100),
    phoneNumber VARCHAR(50) UNIQUE,
    imgUrl VARCHAR(200),
    bio VARCHAR(MAX),
    location VARCHAR(50),
    registrationDate DATE
);

--stored procedure to insert data int my table 
CREATE PROCEDURE users.InsertUserData
    @fullNames VARCHAR(50),
    @userName VARCHAR(50),
    @email VARCHAR(50),
    @password VARCHAR(100),
    @phoneNumber VARCHAR(50),
    @imgUrl VARCHAR(200),
    @bio VARCHAR(MAX),
    @location VARCHAR(50),
    @registrationDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO users.UsersData (fullNames, userName, email, password, phoneNumber, imgUrl, bio, location, registrationDate)
    VALUES (@fullNames, @userName, @email, @password, @phoneNumber, @imgUrl, @bio, @location, @registrationDate);
END;

--test the stored procedure
EXEC users.InsertUserData
    @fullNames = 'John Doe',
    @userName = 'johndoe123',
    @email = 'johndoe45@example.com',
    @password = 'hashed_password',
    @phoneNumber = '1234567890',
    @imgUrl = 'https://example.com/profile.jpg',
    @bio = 'I am a software developer passionate about coding.',
    @location = 'New York',
    @registrationDate = '2023-06-29';



--DROP TABLE UsersData
INSERT INTO users.UsersData (fullNames, userName, email, password, phoneNumber, imgUrl, bio, location, registrationDate)
VALUES ('John Doe', 'johndoe', 'johndoe@example.com', 'password123', '+254712345678', 'https://example.com/johndoe.jpg', 'I am a software developer', 'Nairobi', '2023-06-29');

SELECT * FROM users.UsersData




