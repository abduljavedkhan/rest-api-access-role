# rest-api-assignments
##### Requirement: [link](https://www.notion.so/Backend-Assignment-eac47d2e6e7544e2ac98d8ba117efd02)

## API details:

### Setup
```
npm install
node server.js
```

update below details on .env
```
MONGO_URI = <DB URL>
JWT_SECRET=<Your Secret Key>
```


Used JWT webtoken for User Authentication. \
Used [Access Control](https://www.npmjs.com/package/accesscontrol) library for ROLE based Authorization
Having role defined as 
```
  ac.grant("user")
    .createOwn("posts")
    .deleteOwn("posts")
    .readOwn("posts")
    .grant("admin")
    .extend("user")
    .updateAny("posts")
    .deleteAny("posts")    
    .grant("superadmin")
    .extend("user")
    .createAny("posts")
    .readAny("posts")
    .updateAny("posts")
    .deleteAny("posts");
  ```  
Works with Access Control Middleware
```
route.post("/api/action-crud",  userController.checkIfLoggedin,
userController.grantAccess("createAny", "posts"), actionController.actionoperation);

```
##### /api/signup
###### create User having role as USER, ADMIN and SUPER-ADMIN
![image](https://user-images.githubusercontent.com/44355278/122188261-6b4ffb80-cead-11eb-850d-0454b35b88ae.png)


##### /api/login
###### use to login created user of role either USER, ADMIN, SUPER-ADMIN and get access token. 
![image](https://user-images.githubusercontent.com/44355278/122188338-7c990800-cead-11eb-9e3c-fdd524152d7e.png)

##### /api/user/posts
###### access by user having role as USER
API for Social Media Post Creation

### Authorization Token is required to make request
![image](https://user-images.githubusercontent.com/44355278/122185450-bc122500-ceaa-11eb-8382-83f457e784ab.png)


### Post Request With Authorization Token
![image](https://user-images.githubusercontent.com/44355278/122185330-a4d33780-ceaa-11eb-8350-c05f90457bdc.png)

##### /api/initiate-crud
###### access by user having role as ADMIN
API to Initiate CRUD of posts on users' behalf. initial status  will be adminrequest. If Super Admin approve/reject status will be changed to done/reject

![image](https://user-images.githubusercontent.com/44355278/122184833-3db58300-ceaa-11eb-8662-a567de7c8f47.png)


##### /api/action-crud
###### access by user having role as SUPER-ADMIN
API to Approve actions initiated by admin

![image](https://user-images.githubusercontent.com/44355278/122184927-53c34380-ceaa-11eb-8bd2-e17d517210c4.png)

