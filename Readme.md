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
 