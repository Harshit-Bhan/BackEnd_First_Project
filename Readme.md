## BackEnd

First Major Backend Project

-[Model link]()



------------------------<<Cloudinary.js>>---------------------

Why do we unlink files if the upload operation fails?
1. To clean up local temporary files
When a user uploads a file:

It first gets saved on your server's local disk (e.g., uploads/temp123.png)

Then you try to upload it to Cloudinary

But if Cloudinary upload fails, now you're stuck with a file you don’t need anymore just sitting there 👎

 2. Why it matters:
If you don’t delete it → your disk will fill up over time with junk files 😬

On shared hosting or low-storage VPS, this can literally crash your app

<----------------------------<user.controllers.js>----------------------->

findOne() :- It returns the first user it finds

<User.findOne({
  $or: [{ username }, { email }]
})   You're telling Mongoose:

"Find a user whose username is equal to the username from the request, OR whose email is equal to the email from the request."

$or: It's a MongoDB operator that allows you to match any one of the conditions inside the array.

{ username }: Shorthand for { username: username }

{ email }: Shorthand for { email: email }>


<-------------------------------<app.js>--------------------------------->
1. express.json({ limit: "16kb" })
Parses incoming JSON data from the request body.

Converts it into a JavaScript object you can access with req.body.

limit: "16kb" restricts the maximum size of the JSON body.

✅ Example:

POST /api/user
{
  "name": "Harshit",
  "age": 21
}
📦 Access in backend:

req.body.name  // "Harshit"
req.body.age   // 21

2. express.urlencoded({ extended: true, limit: "16kb" })
Parses form data (from HTML forms with application/x-www-form-urlencoded).

Converts it into a JavaScript object.

extended: true allows nested objects in form data.

✅ Example HTML Form:

<form action="/submit" method="POST">
  <input name="username" />
  <input name="email" />
</form>
📦 Access in backend:

req.body.username
req.body.email

3. express.static("public")
Makes everything inside the public/ folder accessible via the browser.

Great for serving images, CSS, JS, HTML, etc.

✅ Folder structure:

public/
  ├── style.css
  └── logo.png
✅ In HTML:

<link rel="stylesheet" href="/style.css">
<img src="/logo.png" />

4. cookieParser()
Parses cookies sent by the browser and makes them available as req.cookies.

✅ Example:

// If browser sends: Cookie: user=Harshit
console.log(req.cookies.user);  // "Harshit"

<--------------------<auth.middleware.js>-------------------->

req.cookies?.accessToken: Tries to get the token from cookies.
"?." ensures that it doesn't throw an error if req.cookies is undefined (safe access).

req.header("Authorization")?.replace("Bearer", ""):
If the token is not in cookies, it checks the Authorization header.
It assumes the token comes with the Bearer prefix (e.g., Bearer abc123).
replace("Bearer", "") removes the Bearer prefix, leaving just the token value.

const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
This line verifies the JWT (JSON Web Token) received from the client using a secret key.
It checks whether the token: Is valid (not tampered with), Is not expired, And was signed with the correct secret.

token: The JWT sent by the client (via cookies or headers).
process.env.ACCESS_TOKEN_SECRET: The secret key used to sign the token (stored in your .env file for security).
If the token is valid, it returns the decoded payload (e.g., user ID).
If not, it throws an error.


<<------------------------------------------>>
  const options = {
        httpOnly: true,
        secure: true
    } : this ensures that the cookies are not modified at the frontend and can only be modified at the server
 
 return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
        new ApiResponse(
            200,{
                user: loggedInUser,accessToken,refreshToken
            },
            "User logged in SuccessFully"
        )
    ) : here we added accesstoken and refreshtoken in apliresponse because it might be possible that user want to store it in the localstorage or he might be developing a mobile app.



    <<-----------------Token Generation-------------------->>

    Got it! Here's a concise summary based on your questions about **JWT tokens** and the flow you were asking about:

---

### **JWT Token Flow**

1. **Incoming Refresh Token**:
   - When a request with a refresh token comes in, the server first checks if the **refresh token** exists in the request.
   - If it's missing, it responds with a `401 Unauthorized` error.

2. **Decoding the Token**:
   - If the refresh token exists, it is **decoded** using `jwt.verify()` with the secret key (`process.env.REFRESH_TOKEN_SECRET`).
   - The **decoded payload** typically contains data like the user’s `_id`.

3. **Verifying the Token**:
   - After decoding, the token's payload is used to find the **user** associated with the token by their `_id`.
   - If no user is found, it indicates the refresh token is invalid, and the server responds with `401 Invalid Refresh Token`.

4. **Matching Refresh Token**:
   - If a user is found, the server compares the **incoming refresh token** with the one stored in the database.
   - If they don’t match, it indicates the token is either expired or already used, and the server throws a `401 Refresh Token is expired or used`.

5. **Why Check Twice?**
   - The token is checked:
     1. To ensure the **signature** and **validity** of the token (via `jwt.verify()`).
     2. To ensure that the **refresh token** matches the one stored in the database (validating it hasn’t been tampered with or reused).

---

This flow ensures that only valid and non-expired refresh tokens are accepted, and they match what is stored on the server.

Does this summary align with your understanding? Let me know if you need any more details!