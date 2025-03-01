## Form App

An app for creating and filling forms/surveys. Supports text, multiple choice, rating and date selection questions.

**Website Link: https://formapp-15i4.onrender.com**

### Client (Frontend)

The client side was built with **React**. Users can create forms, edit them, or analyze results. After being created, forms can be filled by anyone using a generated link:

<p align="center"><img alt="Creating a form" src="https://github.com/user-attachments/assets/ad729a37-ea2b-45df-a2de-63388d605451" width='500' /></p>

The analysis tab has various graphs depending on the question type (built using Rechart) allowing form creators to see a summary of the responses to the form. Of course, the creator can also go through each response individually.

<p align="center"><img alt="Creating a form" src="https://github.com/user-attachments/assets/9bf761bc-d23c-4c69-813d-2e4bda208f35" width='500' /></p>

### Server (Backend)

The server side was built with **Spring Boot**, using **MongoDB** for the database. It uses JWT tokens for authentication. While creating or editing form requires the user to be authenticated, filling out forms does not (meaning users don't need an account to respond to a form, only the form link)
