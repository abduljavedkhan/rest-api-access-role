# rest-api-access-role

## API details:
Live Hosted URL: https://rest-api-access-role.herokuapp.com/
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
    .updateAny("posts-a")
    .deleteAny("posts-a")    
    .grant("superadmin")
    .extend("user")
    .createAny("posts-sa")
    .readAny("posts-sa")
    .updateAny("posts-sa")
    .deleteAny("posts-sa");
  ```  
Works with Access Control Middleware
```
route.post("/api/action-crud",  userController.checkIfLoggedin,
userController.grantAccess("createAny", "posts-sa"), actionController.actionoperation);

```
##### /api/signup
###### create User having role as USER, ADMIN and SUPER-ADMIN
Response:

![image](https://user-images.githubusercontent.com/44355278/122188261-6b4ffb80-cead-11eb-850d-0454b35b88ae.png)


##### /api/login
###### use to login created user of role either USER, ADMIN, SUPER-ADMIN and get access token. 
Response:

![image](https://user-images.githubusercontent.com/44355278/122188338-7c990800-cead-11eb-9e3c-fdd524152d7e.png)

##### /api/user/posts
###### access by user having role as USER
API for Social Media Post Creation

### Authorization Token is required to make request
Response:

![image](https://user-images.githubusercontent.com/44355278/122185450-bc122500-ceaa-11eb-8382-83f457e784ab.png)


### Post Request With Authorization Token
Request
```
{
"message": "Wow, i just leant TypeGraphQL and made a project using Node-postgres, TypeGraphQL and Apollo Server",
"username" : "user"
}
```
Response:

![image](https://user-images.githubusercontent.com/44355278/123022721-d80a4f00-d3f3-11eb-9ef1-741f42bcca4a.png)

##### /api/initiate-crud
###### access by user having role as ADMIN
API to Initiate CRUD of posts on users' behalf. initial status  will be adminrequest. If Super Admin approve/reject status will be changed to done/reject
Request body:
```
{
    "postid": "60d290ce32e4c00015039a44",
    "operation": "update",
    "status": "adminrequest"
}
```
Response:

![image](https://user-images.githubusercontent.com/44355278/123045666-cb4c2200-d418-11eb-9306-10ad9552bbdb.png)


##### /api/action-crud
###### access by user having role as SUPER-ADMIN
API to Approve actions initiated by admin
Request body:
```
{
    "postid": "60d290ce32e4c00015039a44",
    "operation": "update",
    "status": "reject"
}
```
Response:

![image](https://user-images.githubusercontent.com/44355278/123045847-064e5580-d419-11eb-9fab-2e84b0a1972f.png)


Note:
By checking the status in response of /api/action-crud API perform further operation on /post API CRUD
