# SphereLab

This repository contains a Node.js-Express API for a code execution platform containerized with Docker. The instructions below explain how to use the API.

NOTE: This API requires Sphere Engine API credentials in .env file. Code execution will not work without it [Link](https://sphere-engine.com/signup)

## ScreenShots:
[Google Drive Link](https://drive.google.com/drive/folders/1V4NBzY4v6_Z8tMh25WYNFR4S1JpzNw5y?usp=sharing)

## API Endpoints
Here is a description of each API endpoint:
<br/>
**Please note that some URLs contain placeholders `<insert problemId here>`, `<insert testcaseNumber here>`, and `<insert submissionId here>`, which should be replaced with the actual values when making requests to those endpoints.**

1. **Register**
   - Method: POST
   - URL: `http://locahost:8000/api/register`
   - Description: Registers a new user with the specified name, email, password, and role.

2. **Login**
   - Method: POST
   - URL: `http://locahost:8000/api/login`
   - Description: Authenticates a user with the provided email and password.

3. **Add Problem**
   - Method: POST
   - URL: `http://locahost:8000/api/admin/add-problem`
   - Description: Adds a new problem with the specified name, body, type ID, master judge ID, and interactive status. Requires authentication as an admin.

4. **Edit Problem**
   - Method: PUT
   - URL: `http://locahost:8000/api/admin/edit-problem/<insert problemId here>`
   - Description: Edits an existing problem with the specified problem ID. Modifies the name and body of the problem. Requires authentication as an admin.

5. **Delete Problem**
   - Method: DELETE
   - URL: `http://locahost:8000/api/admin/delete-problem/<insert problemId here>`
   - Description: Deletes an existing problem with the specified problem ID. Requires authentication as an admin.

6. **Add Testcase**
   - Method: POST
   - URL: `http://locahost:8000/api/admin/add-testcase/<insert problemId here>`
   - Description: Adds a new testcase to the problem with the specified problem ID. Includes the input, output, time limit, judge ID, and active status of the testcase. Requires authentication as an admin.

7. **Edit Testcase**
   - Method: PUT
   - URL: `http://locahost:8000/api/admin/edit-testcase/<insert problemId here>/<insert testcaseNumber here>`
   - Description: Edits an existing testcase for the problem with the specified problem ID and testcase number. Modifies the input, output, time limit, judge ID, and active status of the testcase. Requires authentication as an admin.

8. **Get Problems**
   - Method: GET
   - URL: `http://locahost:8000/api/user/all-problems?page=1`
   - Description: Retrieves a paginated list of all problems. The `page` query parameter specifies the page number to retrieve. Requires user authentication.

9. **Create Submission**
   - Method: POST
   - URL: `http://locahost:8000/api/user/submit-answer`
   - Description: Creates a new submission for a problem. Includes the problem ID, source code, compiler ID, compiler version ID, and number of tests. Requires user authentication.

10. **Check Result**
    - Method: GET
    - URL: `http://locahost:8000/api/user/result/<insert submissionId here>`
    - Description: Retrieves the result of a submission with the specified submission ID. Requires user authentication.

## Packages used:
1. **Axios**: Axios is used to simplify making HTTP requests from your Node.js/Express.js app to Sphere Engine API.

2. **Bcrypt**: Bcrypt is used to securely hash & verify user passwords, protecting them from unauthorized access.

3. **Helmet**: Helmet is used to add an extra layer of security to your Express.js app by setting appropriate HTTP headers and preventing common security vulnerabilities.

4. **Joi**: Joi is used to validate and ensure that incoming data in your Express.js app adheres to the expected structure and constraints, preventing invalid or malicious data.

5. **Morgan**: Morgan is used to log detailed information about incoming requests in your Express.js app, aiding in debugging, monitoring, and analysis.

6. **Nodemailer**: Nodemailer is used to easily send emails from your Node.js/Express.js app.
