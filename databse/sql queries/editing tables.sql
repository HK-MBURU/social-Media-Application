ALTER TABLE users.UsersData ADD token varchar(255);
ALTER TABLE users.UsersData ADD expires BIGINT;




ALTER PROCEDURE users.InsertUserData
    @fullNames VARCHAR(50),
    @userName VARCHAR(50),
    @email VARCHAR(50),
    @hashedPwd VARCHAR(100),
    @phoneNumber VARCHAR(50),
    @imgUrl VARCHAR(200),
    @bio VARCHAR(MAX),
    @location VARCHAR(50),
    @registrationDate DATE,
    @token VARCHAR(255), -- added parameter
	@expires BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO users.UsersData (fullNames, userName, email, hashedPwd, phoneNumber, imgUrl, bio, location, registrationDate, token,expires)
    VALUES (@fullNames, @userName, @email, @hashedPwd, @phoneNumber, @imgUrl, @bio, @location, @registrationDate, @token,@expires);
END;
