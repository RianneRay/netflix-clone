import AuthScreen from './AuthScreen.jsx'

const HomePage = () => {
  const user = false;
  return (
    <div>{ user ? <HomeScreen /> : <AuthScreen />}</div>
  );
}

export default HomePage;