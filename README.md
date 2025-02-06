
#  Authentication & Role-Based Access Control (RBAC)


Hello there, welcome to the Authentication & Role-Based Access Control (RBAC) Backend repository,This is a self-assessment that aims to evaluate my back-end development skills, including my knowledge knowledge of Node.js, Express.js, MongoDB, and AWS.


     The backend systems of the Auth & RBAC is built on layered architecture with Node.js-Typescript, Exensuring a clear separation of concerns. This approach enhances modularity, maintainability, and scalability, allowing seamless integration of new features. The layers include presentation, application, domain, data, and repositories each serving specific functions, enabling a robust and flexible backend infrastructure.

## Pre-requisites

For you to be able to utilize this repository you need to have the following installed:

- Operating System `Windows, Linux or MacOS`
- [NodeJS 18.x](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/) (OPTIONAL ~ Api testing. Alternatively, you can use a browser)

## Getting Started 💪 💪 💪 

Here is a quick guide to help you get setup:

- Clone the repository

       $ git clone https://github.com/AaronAttah/Tinteq-Self-Assessment



- create an env file(.env) on the rootdirectory, copy and paste all the content(s) found in the attached envfile in the email sent to hr@tinkteq.com into the env file

- Install the required Node dependencies by runinng the command below in your rootdirectory on the terminal.

      $ npm install

- Run the application after installation is done

      $ npm run dev     = for developement //local
      $ npm run start   = for deployment   //staging, preproduction and production

- You can run your tests on the EP's on Postman using the documenter link below:
  
     https://documenter.getpostman.com/view/16602053/2sAYX6ng78

   NOTE:
     📌. To create an account input your full_name, email, password, role(_id)
             - use the getroles endpoint found in the startup folder on postman to fetch lists of roles, and pick the  id as it this is used for the user account-role type.
         

     📌.  Once you login on postman using the login EP, you dont need to copy token or do all that stuff, just go on to test the other Enpoints, JUST BE MINDFUL OF THE ACCOUNT/USER TYPE USED IN TESTING THE ENDPOINTS AS IT HAS DIFFERENT RESPONSES FOR DIFFERENT USERS(admin, shipper, carrier)
     
         ✍️ ✍️   The admin account that has the ability to access all the routes.

     📌. Kindly note that the post and delete startup Endpoints can only be performed/tested using the admin accoount.

##    Users Accounts for your soft landing
- Admin
    email: admin@gmail.com
    password: Admin@123

- Shipper
    email: shipper@gmail.com
    password: Shipper@123

- Carrier
    email: carrier@gmail.com
    password: Carrier@123    

    📌📌📌 you can create any of this account yourself aswell 👍👍


## Folder/Directory Structure

- Src
     - Route
     - Model
     - Operations
     - Controller
     - Services
     - Repository
     - Middleware
     - Startup
     - Utils
     - Validations
     - Interfaces
     - Config
     - e.t.c
          

## Technology Stacks

This application has been built with the following technologies:

![img](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![img](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![img](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![img](https://img.shields.io/badge/Typescript.js-3399ff?style=for-the-badge&logo=nodedotjs&logoColor=blue)
![img](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![img](https://img.shields.io/badge/Render-4EA900?style=for-the-badge)



- [Express](https://www.expressjs.com/)
- [NodeJs](https://www.nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [NPM](https://www.npmjs.com/)
- [AWS](https://www.amazon.com/)
- [Render](https://www.render.com/)
- [MongoDB](https://www.mongodb.com/)
  
  
## STARTUP COLLECTIONS/DATAS

- roles
- etc



@Principal: Attah Ojima Aaron
