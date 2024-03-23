# UzaHaraka Point of Sale
UzaHaraka is a single business Point of sale web app. Its build with django in the backend and react in the frontend.
The backend uses sessionbased authenication and authorizaation for the user.

To user the app move to point-of-sale folder using this command in linux
``` cd UzaHaraka_Point_of_sale/point_of_sale ```

Create the tables in database using
```python3 manage.py makemigrations
python3 manage.py migrate```

The Admin is created from the commandline using
```python3 manage.py createsuperuser```

The admin then runs starts the app using
```python3 manage.py runserver```

And visits the admin page and create account the for the employees user users
> http://127.0.0.1:8000/admin/ 


## Backend API'S
The backend communicated with the front end using API.
### To login a user that was created by admin
The user can use the user name or email addreess to login
### /user/login/ 
POST: Return a json of the username and profile picture of the user if set
```{"username":"bon","profilePic":"/media/profile_pics/hp.jfif"}```

This creates a session for the user and sets two cookies in the  browser
The sessionid and crsftoken
```
csrftoken=2J42Vf5q10ux2huO5pMnuORIhxLNUhEZ
essionid=632l6nkhat0b751a1xkmtw0aumzpd3es
```

All subsequent call to the backend must authenicate the user with the session id and CSRF token by setting them in the header of each request
```
X-CSRFToken: 2XORN895V8mX8oUPuZDB1Qhz3PoELUVC
Cookie: csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot"
```

### To logout a user
### /user/logout/
POST: deletes the session from the backend and logout the user 
. If the user must be logged in before he logout
