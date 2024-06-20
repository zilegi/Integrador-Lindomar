import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from "@expo/vector-icons"
// import Details from "./pages/read"
import Login from "./pages/auth/login"
import Home from "./pages/home/home"
import Detalhes from './pages/Detalhes/home'

const Pilha = createStackNavigator()
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#111',
                    paddingBottom: 1,
                    paddingTop: 1,
                    borderTopColor: 'transparent'
                },
                tabBarActiveTintColor: '#80f',
                tabBarInactiveTintColor: '#111'
            }}

        >
            <Tab.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="user" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="home" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Detalhes"
                component={Detalhes}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="detalhes" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}



export default function Routers() {
    return (
        <NavigationContainer>
            <Pilha.Navigator initialRouteName="Home">
            <Pilha.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Pilha.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Pilha.Screen
                    name="Detalhes"
                    component={Detalhes}
                    options={{ headerShown: false }}
                />
            </Pilha.Navigator>
        </NavigationContainer>
    )
}