import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	ImageBackground
} from 'react-native';
import { listTodos } from '../src/graphql/queries';
import { createTodo } from '../src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import backdrop from '../assets/images/PLZbackdrop.png';

export default class App extends React.Component {
	state = {
		zip: '',
		phoneNumber: '',
		name: '',
		todos: [],
		isVisible: false,
		showInputs: false,
		ZIPfilter: '',
		location: null
	};

	async componentDidMount() {
		try {
			const todos = await API.graphql(graphqlOperation(listTodos));
			// console.log('todos: ', todos);
			this.setState({ todos: todos.data.listTodos.items });

			// this.findCoordinates();
		} catch (err) {
			console.log('error: ', err);
		}
	}

	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const location = JSON.stringify(position);

				this.setState({ location });
				console.log(location);
			},
			(error) => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

	onChangeText = (key, val) => {
		this.setState({ [key]: val });
	};

	// addInfo = async (event) => {
	// 	const { name, todos, zip, phoneNumber } = this.state;

	// 	event.preventDefault();

	// 	const input = {
	// 		name,
	// 		zip,
	// 		phoneNumber
	// 	};

	// 	const result = await API.graphql(graphqlOperation(createTodo, { input }));

	// 	const newTodo = result.data.createTodo;
	// 	const updatedTodo = [ newTodo, ...todos ];
	// 	this.setState({ todos: updatedTodo, name: '', zip: '', phoneNumber: '', showInputs: false });
	// };

	render() {
		return (
			<View style={styles.container}>
				{this.state.showInputs === false && (
					<ImageBackground source={backdrop} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
						<View style={styles.filterAndAdd}>
							<TextInput
								style={styles.zipFilterInput}
								value={this.state.ZIPfilter}
								onChangeText={(val) => this.onChangeText('ZIPfilter', val)}
								placeholder="Enter ZIP to find people near you"
								maxLength={5}
								keyboardType={'numeric'}
							/>
						</View>
					</ImageBackground>
				)}

				{this.state.showInputs === false && (
					<ImageBackground source={backdrop} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
						<ScrollView style={styles.scrollView}>
							{this.state.todos.filter((todo) => todo.zip == this.state.ZIPfilter).map((todo, index) => (
								<View key={index} style={styles.todo}>
									<Text style={styles.nameTitle}>
										Items: <Text style={styles.name}>{todo.name}</Text>
									</Text>
									<Text style={styles.nameTitle}>
										ZIP: <Text style={styles.name}>{todo.zip}</Text>
									</Text>
									<Text style={styles.nameTitle}>
										Phone: <Text style={styles.name}>{todo.phoneNumber}</Text>
									</Text>
								</View>
							))}
						</ScrollView>
					</ImageBackground>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingTop: 20
	},
	input: {
		height: 50,
		borderBottomWidth: 2,
		borderBottomColor: '#31465F',
		marginVertical: 10
	},
	zipFilterInput: {
		height: 'auto',
		borderBottomWidth: 2,
		borderBottomColor: '#31465F',
		marginVertical: 0,
		paddingBottom: 10,
		paddingVertical: 20,
		// fontSize: 16
		// fontFamily: 'Chalkboard SE',
		backgroundColor: '#fff'
	},
	filterAndAdd: {
		marginBottom: 20
	},
	buttonContainer: {
		backgroundColor: '#34495e',
		marginTop: 10,
		marginBottom: 20,
		padding: 10,
		borderRadius: 5,
		alignItems: 'center'
	},
	addbuttonContainer: {
		backgroundColor: '#34495e',
		marginTop: 10,
		padding: 10,
		borderRadius: 5,
		alignItems: 'center'
	},
	buttonText: {
		color: '#fff',
		fontSize: 24
	},

	todo: {
		borderBottomWidth: 1,
		borderRadius: 10,
		marginBottom: 10,
		marginHorizontal: 10,
		borderBottomColor: '#ddd',
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: '#31465F'
	},
	name: {
		fontSize: 16,
		fontWeight: 'normal',
		paddingHorizontal: 10,
		textTransform: 'uppercase',
		fontFamily: 'Chalkboard SE',
		color: 'white'
	},

	nameTitle: {
		fontWeight: 'bold',
		paddingHorizontal: 10,
		color: 'white',
		fontFamily: 'Chalkboard SE'
	},
	or: {
		fontSize: 20,
		marginVertical: 20,
		textAlign: 'center'
	},
	scrollView: {
		backgroundColor: 'white',
		marginHorizontal: -10
	}
});
