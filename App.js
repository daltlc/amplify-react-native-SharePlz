import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
Amplify.configure(config);
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from './aws-exports';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import { withAuthenticator } from 'aws-amplify-react-native';
import { CustomAuthTheme } from './components/CustomAuthTheme';

// import './styles/App.scss';

const Stack = createStackNavigator();

function App(props) {
	const [ isLoadingComplete, setLoadingComplete ] = React.useState(false);
	const [ initialNavigationState, setInitialNavigationState ] = React.useState();
	const containerRef = React.useRef();
	const { getInitialState } = useLinking(containerRef);

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHide();

				// Load our initial navigation state
				setInitialNavigationState(await getInitialState());

				// Load fonts
				await Font.loadAsync({
					...Ionicons.font,
					'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
				});
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setLoadingComplete(true);
				SplashScreen.hide();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return null;
	} else {
		return (
			<View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
				<NavigationContainer ref={containerRef} initialState={initialNavigationState}>
					<Stack.Navigator>
						<Stack.Screen
							options={{
								title: 'My home',
								headerStyle: {
									backgroundColor: '#152939'
								},
								headerTintColor: '#fff',
								headerTitleStyle: {
                  fontWeight: 'bold',
                  fontFamily: 'Chalkboard SE',
                  fontSize: 24
								}
							}}
							name="Root"
							component={BottomTabNavigator}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		);
	}
}

const signUpConfig = {
	header: 'Sign Up',
	hideAllDefaults: true,
	hideSignUp: true,
	signUpFields: [
		{
			label: 'Email',
			key: 'email',
			required: true,
			displayOrder: 1,
			type: 'email'
		},
		{
			label: 'Password',
			key: 'password',
			required: true,
			displayOrder: 2,
			type: 'password'
		}
	]
};

export default withAuthenticator(App, {
	// Render a sign out button once logged in
	includeGreetings: true,
  signUpConfig,
  theme: {
    button: { backgroundColor: '#6ec2d7', fontWeight: 'bold', borderRadius: '4px', margin: '0 auto' },
    a: { color: '#6ec2d7'}
  }
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#e6e6e6'
	}
});
