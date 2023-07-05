CREATE OR ALTER PROCEDURE users.getUserByPhone(
@phoneNumber VARCHAR(20)
)
AS
BEGIN
SELECT* FROM users.UsersData WHERE phoneNumber=@phoneNumber
END
GO