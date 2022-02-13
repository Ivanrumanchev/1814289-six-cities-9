import MainScreen from '../main-screen/main-screen';

type AppScreenProps = {
  placesCount: number;
}

function App(AppScreenProps: AppScreenProps): JSX.Element {
  return (
    <MainScreen
      placesCount={AppScreenProps.placesCount}
    />
  );
}

export default App;
