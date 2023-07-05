
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