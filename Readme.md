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

 