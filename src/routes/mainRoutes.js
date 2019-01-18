import MarketView from '../views/MarketPlace/MarketView.jsx';
import SellView from '../views/SellViews/SellView.jsx';
import AccountView from '../views/AccountViews/AccountView.jsx';
import MainPage from '../views/MainPage.jsx';

const mainRoutes = [
  { path: '/main/market', name: 'Market', component: MarketView },
  { path: '/main/sell', name: 'Sell', component: SellView },
  { path: '/main/account', name: 'MyAccount', component: AccountView },
  {
    redirect: true,
    path: '/main',
    pathTo: '/main/market',
    name: 'Market'
  }
];

export default mainRoutes;
