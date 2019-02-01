import MarketView from '../views/MarketPlace/MarketView.jsx';
import SellView from '../views/SellViews/SellView.jsx';
import AccountView from '../views/AccountViews/AccountView.jsx';
import ItemPage from '../views/MarketPlace/ItemPage.jsx';
import LandingPage from '../views/LandingPage/LandingPage.jsx';
import ProjectForumsMain from '../views/ProjectForums/ProjectForumsMain.jsx';
// import MainPage from '../views/MainPage.jsx';

const mainRoutes = [
  //  Deeper routes first, so they can get matched before.
  { path: '/main/market/:id', key: '4', name: 'ItemPage', component: ItemPage },
  { path: '/main/market', key: '1', name: 'Market', component: MarketView },
  { path: '/main/sell', key: '2', name: 'Sell', component: SellView },
  { path: '/main/account', key: '3', name: 'MyAccount', component: AccountView },
  { path: '/main/landing', key: '5', name: 'Landing', component: LandingPage },
  { path: '/main/forums', key: '6', name: 'Sell', component: ProjectForumsMain },
  {
    redirect: true,
    path: '/main',
    pathTo: '/main/market',
    name: 'Market'
  }
];

export default mainRoutes;
