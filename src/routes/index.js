import LoginPage from '../views/LoginViews/LoginPage.jsx';
import MainPage from '../views/MainPage.jsx';

const indexRoutes = [
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/main', name: 'Home', component: MainPage },
  {
    redirect: true,
    path: '/',
    pathTo: '/main/',
    name: 'Main'
  }
];

export default indexRoutes;
