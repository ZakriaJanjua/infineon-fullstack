### Greetings!

Welcome to the Superhero application made for the Full Stack Developer task at infineon technologies. Following are the instructions on how to setup the application and get it running.

### Setup Application

- Clone the repo locally at your PC.
- Start the docker desktop.
- ###### Backend Application
- Using the terminal `cd backend` into the backend folder.
- Run the command `docker build -t backend .`.
- After that run the command `docker run --name backend-app -p 5000:5000 backend`.
- If you successfully follow these instructions the backend app will start working.
- To cross check go to `http://localhost:5000/` and if you receive greetings then the API is working.
- ###### Frontend Application
- Open another terminal and run `cd frontend` to go into the frontend app folder.
- Run the command `docker build -t frontend .`.
- After that run the command `docker run --name frontend-app -p 3000:3000 frontend`.
- The frontend app can be accessed at `http://localhost:3000/`. You will be taken to the Sign In page.

### Using the Application

If you have successfully setup the application you have done great!!!
Now lets look at how the application works.

The application has 2 types of users i.e. `USER` and `ADMIN`.

The only difference between them is that `ADMIN` can change the details of the superheroes and `USER` cannot do that.

#### Auth Pages

When you are taken to the Sign In page, you can either go to Sign Up page and create a new user or you can use one of mine.

---

`USER` credentials
email: `john.doe@gmail.com`
password: `123123123`

---

`ADMIN` credentials
email: `admin@gmail.com`
password: `123123123`

---

You can create a `USER` but you cannot create an `ADMIN` from the Sign Up page. To create the `ADMIN` user I used a script to independently seed the `ADMIN`. If you want to create your own `ADMIN` user you can go to the `/backend/scripts/seedAdmin.js`, change the credentials of the user and then locally in the terminal run the command `npm run seed:admin` and the `ADMIN` user will be added.

ANYWAYS!

#### Homepage and Superhero Page

When you login the application you will start to the see the list of superheroes. Feel free to click on the `Details` button and you will be directed to the details page. There will be accordions that you can open and close to the see the details of the superhero.

If you are logged in with the `ADMIN` user you will automatically be able to change the text in the input fields and there will be a `Submit button` at the end which you can click and the superhero changes will be reflected in the database.

Click on the `+ Add` button and they will be added to your team.

Bottom of the homepage will be pagination component and you can check out the superheroes on next pages.

#### Team Page

On the header component will be a `Hamburger Icon`. Click on it and you will see the `role` of the user you are logged in with and an option to go to the `Team` page and the last option with which you will be logged out of the system.

On the Teams page there will be 3 things shown to you.

1. Your team
2. Recommendations from the system.
3. Bouts (Matches between your team and other teams)

The strategies with which I am suggesting the team recommendations and with which I am deciding the bouts are detailed and will discuss them in the presentation.

P.S: the env files and the secret variables have been pushed to github on purpose. I did not want to hassle you with adding the env files yourself so I let them push to github. Do not worry about them! :)
