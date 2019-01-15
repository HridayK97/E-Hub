import LoginPage from '../views/LoginPage.jsx';
import MainPage from '../views/MainPage.jsx';

var indexRoutes = [
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/main", name: "Home", component: MainPage },
];

export default indexRoutes;