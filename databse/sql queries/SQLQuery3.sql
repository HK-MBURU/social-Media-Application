USE [socialMediaDB]
GO
/****** Object:  StoredProcedure [users].[InsertUserData]    Script Date: 7/5/2023 10:29:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [users].[InsertUserData]
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
