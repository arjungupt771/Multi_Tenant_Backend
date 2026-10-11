# Frontend for Multi-Tenant SaaS App

This React application provides a simple, Bootstrap‑styled user interface for interacting with the multi-tenant backend API. It uses a custom indigo theme, gradient header, and CSS/Animate.css animations to keep the interface lively.
## Setup & Running

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Configure API URL**

The frontend expects an environment variable `REACT_APP_API_URL` pointing to the backend base URL. By default the backend listens on port **8000**, so the included `.env` file now reads:

```env
REACT_APP_API_URL=http://localhost:8000
```

If you change the backend port, update this value and restart the React development server.

   Adjust the URL if your backend is running elsewhere.

3. **Start development server**

   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000).

## Features

The UI uses [Bootstrap](https://getbootstrap.com/) for layout and components, giving it a more polished, responsive appearance. Additional polish comes from [React Icons](https://react-icons.github.io/react-icons/) and simple CSS animations (via Animate.css and custom keyframes) for headers and list entries.


- **Home**: full-screen landing page featuring an animated gradient background, a summary of the tech stack (backend, frontend, architecture), feature bullets, and prominent buttons to signup or login.
- **Signup**: create an organization and admin user; token stored in `localStorage`.
- **Login**: authenticate existing user and resume work.
- **Projects**: list, create, and delete projects (visible after login).
- **Tasks**: create tasks under a project and toggle their completion status.
- **Logout**: clear token and return to home.

**Navigation flow:** users land on a colourful home page, can sign up or login. After login they're taken to the projects dashboard.
All API requests automatically include the JWT token returned by the backend after signup.

## Scripts

In the project directory, you can run:

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
