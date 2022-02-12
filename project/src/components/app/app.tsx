import MainScreen from '../main-screen/main-screen';
// import MainEmptyScreen from '../main-empty-screen/main-empty-screen';
// import LoginScreen from '../login-screen/login-screen';
// import FavoritesScreen from '../favorites-screen/favorites-screen';
// import FavoritesEmptyScreen from '../favorites-empty-screen/favorites-empty-screen';
// import PropertyScreen from '../property-screen/property-screen';
// import PropertyNotLoggedScreen from '../property-not-logged-screen/property-not-logged-screen';

type AppScreenProps = {
  placesCount: number;
}

function App(AppScreenProps: AppScreenProps): JSX.Element {
  return (
    <MainScreen placesCount={ AppScreenProps.placesCount } />
    // <MainEmptyScreen />
    // <LoginScreen />
    // <FavoritesScreen />
    // <FavoritesEmptyScreen />
    // <PropertyScreen />
    // <PropertyNotLoggedScreen />
  );
}

export default App;
