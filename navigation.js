import { createStackNavigation } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import NSmanViewPage from "./NSmanViewPage";
import SupervisorPage from "./SupervisorPage";
import loginPage from "./loginPage";

const screens = {
  loginPage: {
    screen: loginPage,
  },
  SupervisorPage: {
    screen: SupervisorPage,
  },
  NSmanViewPage: {
    screen: NSmanViewPage,
  },
};

const navigation = createStackNavigator(screens);
export default createAppContainer(navigation);
