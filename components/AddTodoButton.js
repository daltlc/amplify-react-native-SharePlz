import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Linking,
	Platform,
	ImageBackground
} from 'react-native';
import { Icon } from 'react-native-elements';
import { listTodos } from '../src/graphql/queries';
import { createTodo } from '../src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import backdrop from '../assets/images/PLZbackdrop.png';

export default class App extends React.Component {
	state = {
		zip: '',
		phoneNumber: '',
		item: '',
		name: '',
		todos: [],
		isVisible: false,
		showInputs: false,
		ZIPfilter: ''
	};

	async componentDidMount() {
		try {
			const todos = await API.graphql(graphqlOperation(listTodos));
			// console.log('todos: ', todos);
			this.setState({ todos: todos.data.listTodos.items });
		} catch (err) {
			console.log('error: ', err);
		}
	}

	onChangeText = (key, val) => {
		this.setState({ [key]: val });
	};

	addInfo = async (event) => {
		const { item, todos, zip, phoneNumber, name } = this.state;

		event.preventDefault();

		const input = {
			item,
			zip,
			phoneNumber,
			name
		};

		const result = await API.graphql(graphqlOperation(createTodo, { input }));

		const newTodo = result.data.createTodo;
		const updatedTodo = [ newTodo, ...todos ];
		this.setState({ todos: updatedTodo, item: '', zip: '', phoneNumber: '', showInputs: false, name: '' });
	};

	dialCall = (number) => {
		let phoneNumber = '';

		if (Platform.OS === 'android') {
			phoneNumber = number;
		} else {
			phoneNumber = number;
		}

		Linking.openURL(phoneNumber);
	};

	render() {
		return (
			<View style={styles.container}>
				{this.state.showInputs === false && (
					<ScrollView style={styles.scrollView}>
						{this.state.todos.map((todo, index) => (
							<View style={styles.todo}>
								<View>
									<Icon reverse name="ios-person" type="ionicon" color="#527fff" />
								</View>
								<View key={index}>
									<Text style={styles.nameTitleName}>
										<Text style={styles.titleName}>{todo.name}</Text>
									</Text>
									<Text style={styles.nameTitle}>
										Items: <Text style={styles.name}>{todo.item}</Text>
									</Text>
									<Text style={styles.nameTitle}>
										ZIP: <Text style={styles.name}>{todo.zip}</Text>
									</Text>
									<Text style={styles.nameTitle} onPress={this.dialCall(todo.phoneNumber)}>
										Phone or WhatsApp: <Text style={styles.name}>{todo.phoneNumber}</Text>
									</Text>
								</View>
							</View>
						))}
					</ScrollView>
				)}
				{this.state.showInputs && (
					<View>
						<TextInput
							style={styles.input}
							value={this.state.name}
							onChangeText={(val) => this.onChangeText('name', val)}
							placeholder="Name"
							maxLength={100}
						/>
						<TextInput
							style={styles.input}
							value={this.state.item}
							onChangeText={(val) => this.onChangeText('item', val)}
							placeholder="Items needed, seperated by commas. Ex: bread, eggs, water)"
							maxLength={100}
						/>
						<TextInput
							style={styles.input}
							value={this.state.zip}
							onChangeText={(val) => this.onChangeText('zip', val)}
							placeholder="Enter ZIP Code"
							maxLength={5}
							// minLength={5}
							keyboardType={'numeric'}
						/>
						<TextInput
							style={styles.input}
							value={this.state.phoneNumber}
							onChangeText={(val) => this.onChangeText('phoneNumber', val)}
							placeholder="Phone number"
							maxLength={12}
							// minLength={12}
							keyboardType={'numeric'}
						/>
						<TouchableOpacity onPress={this.addInfo} style={styles.buttonContainer}>
							<Text style={styles.buttonText}>Add</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.setState({ showInputs: false })}
							style={styles.buttonContainer}
						>
							<Text style={styles.buttonText}>Back</Text>
						</TouchableOpacity>
					</View>
				)}
				{this.state.showInputs === false && (
					// <ImageBackground source={backdrop} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
					<View style={styles.filterAndAdd}>
						<TouchableOpacity
							onPress={() => this.setState({ showInputs: true })}
							style={styles.addbuttonContainer}
						>
							<Text style={styles.buttonText}>Add + </Text>
						</TouchableOpacity>
					</View>
					// </ImageBackground>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f4f4f4',
		paddingHorizontal: 10,
		paddingTop: 20
	},
	input: {
		height: 50,
		borderBottomWidth: 2,
		borderBottomColor: 'lightblue',
		marginVertical: 10
	},
	zipFilterInput: {
		height: 50,
		borderBottomWidth: 2,
		borderBottomColor: 'lightblue',
		marginVertical: 10,
		fontSize: 16
	},
	filterAndAdd: {
		marginBottom: 20
	},
	buttonContainer: {
		backgroundColor: '#6ec2d7',
		marginTop: 10,
		marginBottom: 20,
		padding: 10,
		borderRadius: 5,
		alignItems: 'center'
	},
	addbuttonContainer: {
		backgroundColor: '#527fff',
		marginTop: 10,
		padding: 10,
		borderRadius: 5,
		alignItems: 'center'
	},
	buttonText: {
		color: '#fff',
		fontSize: 24,
		fontFamily: 'Chalkboard SE'
	},

	todo: {
		borderBottomWidth: 1,
		borderRadius: 10,
		marginBottom: 10,
		marginHorizontal: 10,
		borderBottomColor: '#ddd',
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: '#E6E6E6',
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#e6e6e6',
		borderBottomWidth: 0,
		shadowColor: '#bbbbbb',
		shadowOffset: { width: 6, height: 6 },
		shadowOpacity: 0.7,
		shadowRadius: 2,
		flexDirection: 'row'
	},
	titleName: {
		fontSize: 16,
		fontWeight: 'bold',
		paddingHorizontal: 10,
		// textTransform: 'uppercase',
		color: 'black',
		fontFamily: 'Arial',
		letterSpacing: 1
	},
	name: {
		fontSize: 14,
		fontWeight: 'normal',
		paddingHorizontal: 10,
		// textTransform: 'uppercase',
		color: 'black',
		fontFamily: 'Arial'
		// letterSpacing: -0.5
	},
	nameTitleName: {
		fontWeight: 'bold',
		paddingHorizontal: 10,
		color: 'black',
		fontSize: 16,
		fontFamily: 'Arial',
		letterSpacing: 1
	},
	nameTitle: {
		// fontWeight: 'bold',
		paddingHorizontal: 10,
		color: 'black',
		fontSize: 14,
		fontFamily: 'Arial',
		letterSpacing: 1
	},
	or: {
		fontSize: 20,
		marginVertical: 20,
		textAlign: 'center'
	},
	scrollView: {
		backgroundColor: '#f4f4f4',
		marginHorizontal: -10
	}
});
