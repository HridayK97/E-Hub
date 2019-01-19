import MarketView from '../views/MarketPlace/MarketView.jsx';
import SellView from '../views/SellViews/SellView.jsx';
import AccountView from '../views/AccountViews/AccountView.jsx';
import MainPage from '../views/MainPage.jsx';

const mainRoutes = [
  { path: '/main/market', key: '1', name: 'Market', component: MarketView },
  { path: '/main/sell', key: '2', name: 'Sell', component: SellView },
  { path: '/main/account', key: '3', name: 'MyAccount', component: AccountView },
  {
    redirect: true,
    path: '/main',
    pathTo: '/main/market',
    name: 'Market'
  }
];

export default mainRoutes;
