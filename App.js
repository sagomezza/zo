import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginIndex from './src/screens/Login/LoginIndex';
import HomeIndex from './src/screens/Home/HomeIndex';
import FooterIndex from './src/screens/Footer/FooterIndex';
import UserInputIndex from './src/screens/UserInput/UserInputIndex';
import LogoutIndex from './src/screens/Logout/LogoutIndex';
import UserExitIndex from './src/screens/UserExit/UserExitIndex'


const navigator = createStackNavigator({
  Screen: UserExitIndex
});

export default createAppContainer(navigator);