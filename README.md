# UzaHaraka Point of Sale
UzaHaraka is a single business Point of sale web app. Its build with django in the backend and react in the frontend.
The backend uses sessionbased authenication and authorizaation for the user.

To use the app move to point-of-sale folder using this command in linux
### Install the required libraries
```
pip install -r requirements.txt
```
Move point of sale folder

``` cd UzaHaraka_Point_of_sale/point_of_sale ```

Create the tables in database using
```
python3 manage.py makemigrations
python3 manage.py migrate
```

The Admin is created from the commandline using
```
python3 manage.py createsuperuser
```

The admin then runs starts the app using
```
python3 manage.py runserver
```

And visits the admin page and create account the for the employees user users
> http://127.0.0.1:8000/admin/ 


## Backend API'S
The backend communicated with the front end using API.
### To login a user that was created by admin
The user can use the user name or email addreess to login
### /user/login/ 
POST: in the body of request username and password is passed
Return a json of the username and profile picture of the user if set. 
Check out the example below where curl is used
```
REQUEST:
curl -X POST localhost:8000/user/login/ -H "Content-Type: application/json" -d '{"username": "bon", "password": "firefox123"}'

RETURN:
{"username":"bon","profilePic":"/media/profile_pics/hp.jfif"}
```

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
```
REQUEST:
curl -X POST localhost:8000/user/logout/ \
-H "Content-Type: application/json" \
-H "Cookie: csrftoken=<csrf_token>; sessionid=<sessionid>" \
-H "X-CSRFToken: <csrf_token>"
```
## INVENTORY API'S
### To view all cataegories in the database
### product/view-category/
GET: This is a get request. The caller must authenicate using sessionid and crsftoken.
RETURNS:  A list of json objects as show below

NOTE: This doesnt list the products associated with each category as this would make the response large and slow. Hence slowing the app
```
 curl -X GET localhost:8000/product/view-category/ -H "Content-Type: applview-category/  X-CSRFToken: 2XORN895V8mX8oUPuZDB1Qhz3PoELUVC" -H "Cookie: csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot" 

 RETURNS:
 [
{"id":"9541f1b3-f240-4c49-84a4-2fffb7d8a906","created_at":"2024-03-20T22:23:50.148029+03:00","updated_at":"2024-03-20T22:23:50.148075+03:00","name":"Bearing","description":"dome","category_image":null},
{"id":"96775063-0b49-494f-b187-e3e332f41728","created_at":"2024-03-20T22:24:02.905464+03:00","updated_at":"2024-03-23T17:28:58.553874+03:00","name":"phone","description":"all phones","category_image":"/media/images/androidphones-2048px-4861.jpg"},
{"id":"3b192771-0ed0-4c9a-a4ac-99fb810f1215","created_at":"2024-03-23T17:25:49.384346+03:00","updated_at":"2024-03-23T17:25:49.384382+03:00","name":"Laptops","description":"All laptops in our stores","category_image":"/media/images/hp_wOozmGH.jfif"},
{"id":"09e0c3d2-3403-421b-92f6-68ad5a47c64b","created_at":"2024-03-23T17:28:49.098576+03:00","updated_at":"2024-03-23T17:28:49.098622+03:00","name":"TVs","description":"All television in our store","category_image":"/media/images/TV.jfif"}
]
```

## To view a specific category and the associted product.
### product/view-a-category/?id=3434343

GET: This a get request with the id of product passed  query parameter. 
The caller must authenicate using sessionid and crsftoken.
RETURNS: a jsone with the products listed under name product_set as show below
```
curl -X GET localhost:8000/product/view-a-category/?id=96775063-0b49-494f-b187-e3e332f41728 -H "X-CSRFToken: 2XORN895V8mX8oUPuZDB1Qhz3PoELUVC" -H "Cookie: csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot" 

RETURNS:
{
"id":"96775063-0b49-494f-b187-e3e332f41728",
"product_set":[
    {"id":"c97cc5a2-9cab-4e39-afb8-b36f2c1c4969","created_at":"2024-03-2_at":"2024-03-23T17:57:31.262645+03:00","name":"Samsung galaxy a12","quantity":50,"buying_pr0.0,"product_image":"/media/images/samsung_galaxy_a12.jfif","category":"96775063-0b49-494f-bc-2524-4420-90e7-d846c18805ff","created_at":"2024-03-23T17:58:07.703668+03:00","updated_at":","name":"Samsung galaxy a14","quantity":60,"buying_price":26000.0,"selling_price":30000.0,"sung_galaxy_a14.jfif","category":"96775063-0b49-494f-b187-e3e332f41728"},
    {"id":"0efb5e8d-cced_at":"2024-03-23T17:59:08.448095+03:00","updated_at":"2024-03-23T17:59:08.448128+03:00","na:40,"buying_price":19000.0,"selling_price":21300.0,"product_image":"/media/images/infinix_ho49-494f-b187-e3e332f41728"},
    {"id":"0613827c-f7f5-4843-ad92-53bd25bd9649","created_at":"2024-ated_at":"2024-03-23T18:00:59.452745+03:00","name":"Techno Spark 6","quantity":23,"buying_pr0.0,"product_image":"/media/images/spark_6.jfif","category":"96775063-0b49-494f-b187-e3e332f-8a24-59efc3f3655f","created_at":"2024-03-23T18:01:31.348950+03:00","updated_at":"2024-03-23echno Spark 5","quantity":45,"buying_price":12500.0,"selling_price":17000.0,"product_image":egory":"96775063-0b49-494f-b187-e3e332f41728"}
    ],
"created_at":"2024-03-20T22:24:02.905464+03:00",
"updated_at":"2024-03-23T17:28:58.55
}
```

## To view all products in the app
### product/view-all-products/

GET: This is a get request. The user must be authenicated. Example is provided below
```
curl -X GET localhost:8000/product/view-all-products/ -H "X-CSRFToken: 2XORN895V8mX8oUPuZDB1Qhz3PoELUVC" -H "Cookie: csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot"

RETURNS:
[
    {"id":"32b697f0-375c-47de-aa3d-e70339ed6f76","created_at":"2024-03-20T22:24:50.558842+03:00","updated_at":"2024-03-23T13:15:05.905618+03:00","name":"6301","quantity":179,"buying_price":60.0,"selling_price":100.0,"product_image":null,"category":"9541f1b3-f240-4c49-84a4-2fffb7d8a906"},
    {"id":"69e034a1-d9ea-4ccb-a4d8-9c1598782650","created_at":"2024-03-20T22:36:21.152404+03:00","updated_at":"2024-03-23T12:58:46.014396+03:00","name":"spark 4","quantity":395,"buying_price":2500.0,"selling_price":15000.0,"product_image":"/media/images/kartify.jfif","category":"96775063-0b49-494f-b187-e3e332f41728"},
    {"id":"d1f88b3f-4efe-473e-a27c-524c90c6b73f","created_at":"2024-03-22T20:23:02.709758+03:00","updated_at":"2024-03-23T12:52:33.496008+03:00","name":"hp laptop","quantity":65,"buying_price":21000.0,"selling_price":25000.0,"product_image":"/media/images/hp.jfif","category":"96775063-0b49-494f-b187-e3e332f41728"},{"id":"b31e8254-50df-4145-affc-9d05ff67b8c0","created_at":"2024-03-23T17:56:38.471692+03:00","updated_at":"2024-03-23T17:56:38.471724+03:00","name":"Samsung galaxy a32","quantity":20,"buying_price":30000.0,"selling_price":35000.0,"product_image":"/media/images/samsung_galaxy_a32.jfif","category":"96775063-0b49-494f-b187-e3e332f41728"},
]

```

## To view a specific product
###  product/view-a-product/?id=32b697f0-375c-47de-aa3d-e70339ed6f76

GET: the id of the product must be passed as a query parameter
RETURNS: a json with the detail or Not found and 404 status code if id doesnt exist
```
curl -X GET localhost:8000/product/view-a-product/?id=32b697f0-375c-47de-aa3d-e70339ed6f76 -H "X-CSRFToken: 2XORN895V8mX8oUPuZDB1Qhz3PoELUVC" -H "C
ookie: csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot" 

RETURNS:
{"id":"32b697f0-375c-47de-aa3d-e70339ed6f76","created_at":"2024-03-20T22:24:50.558842+03:00","updated_at":"2024-03-23T13:15:05.905618+03:00","name":"6301","quantity":179,"buying_price":60.0,"selling_price":100.0,"product_image":null,"category":"9541f1b3-f240-4c49-84a4-2fffb7d8a906"}
```

## To view all sales of the logged in employee.
If the employeee is logged in and would like to read the sales he has done
### product/view-sales/
GET: This is a get request to vview sales of the logged in user
RETURNS: A list of all sales with status code 200 or  403 if not authenicated
```
curl -X GET localhost:8000/product/view-sales/ -H "X-CSRFToken: 2XORN895V8mX8oUPuZDB1Qhz3PoELUVC" -H "Cookie: csrftoken=2XORN895V8mX8oUPuZDB1Qhz3Po
ELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot" 

RETURNS:
[
{"id":"51789d15-bc68-4121-b958-4c902c913432","created_at":"2024-03-21T13:16:14.429737+03:00","updated_at":"2024-03-21T13:16:14.429803+03:00","quantity":12,"selling_price":15000.0,"total":180000.0,"product":"69e034a1-d9ea-4ccb-a4d8-9c1598782650","user":3},
{"id":"0f2941ae-47d8-4de2-93ee-aeb540b01781","created_at":"2024-03-22T09:10:31.849246+03:00","updated_at":"2024-03-22T09:10:31.849393+03:00","quantity":5,"selling_price":15000.0,"total":75000.0,"product":"69e034a1-d9ea-4ccb-a4d8-9c1598782650","user":3}
]
``` 

## To make a sale of the product
### /product/make-sales/
POST: post request to make a sale. In the boddy of the request the id of the product must be passed,
quantity to be soldm and selling price
RETURNs
Successful Sale with status code 201 if suceess 401 if not authorised  or 404 if no product found
```
curl -X POST localhost:8000/product/make-sales/ \
> -H "Content-Type: application/json" \
> -H "X-CSRFToken: 2XORN895V8mX8oUPuZDB1Qhz3PoELUVC" \
> -H "Cookie: csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot" \
> -d '{"id": "69e034a1-d9ea-4ccb-a4d8-9c1598782650", "quantity": 5, "selling_price": 20}  

RETURNS
"Sucessful sale"
```

## To search for any item by name
### GET /product/search/?name=lapTOP

the item being searched is passed as a query parameter 'name'. In the above example laptop is passed
RETURNS:  alist if products that contain that name. Its case insensitive


```
[
    {
        "id": "d1f88b3f-4efe-473e-a27c-524c90c6b73f",
        "created_at": "2024-03-22T20:23:02.709758+03:00",
        "updated_at": "2024-03-23T12:52:33.496008+03:00",
        "name": "hp laptop",
        "quantity": 65,
        "buying_price": 21000.0,
        "selling_price": 25000.0,
        "product_image": "/media/images/hp.jfif",
        "category": "96775063-0b49-494f-b187-e3e332f41728"
    },
    {
        "id": "bf6bf3e4-1760-4e40-828a-9edabfdd5908",
        "created_at": "2024-03-23T18:14:36.790869+03:00",
        "updated_at": "2024-03-23T18:14:36.790900+03:00",
        "name": "HUawei mate Laptop",
        "quantity": 40,
        "buying_price": 30000.0,
        "selling_price": 50000.0,
        "product_image": "/media/images/huawei_laptop.jfif",
        "category": "3b192771-0ed0-4c9a-a4ac-99fb810f1215"
    }
]
```
