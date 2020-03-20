import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { listTodos } from '../src/graphql/queries';
import { createTodo } from '../src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
export default class App extends React.Component {
	state = {
		zip: '',
		phoneNumber: '',
		name: '',
		todos: [],
		isVisible: true,
	};

	async componentDidMount() {
		try {
			const todos = await API.graphql(graphqlOperation(listTodos));
			console.log('todos: ', todos);
			this.setState({ todos: todos.data.listTodos.items });
		} catch (err) {
			console.log('error: ', err);
		}
	}

	onChangeText = (key, val) => {
		this.setState({ [key]: val });
	};

	addInfo = async (event) => {
		const { name, todos, zip, phoneNumber } = this.state;

		event.preventDefault();

		const input = {
			name,
			zip,
			phoneNumber
		};

		const result = await API.graphql(graphqlOperation(createTodo, { input }));

		const newTodo = result.data.createTodo;
		const updatedTodo = [ newTodo, ...todos ];
		this.setState({ todos: updatedTodo, name: '', zip: '', phoneNumber: '' });

		this.setState({ isVisible: false })
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.scrollView}>
					{this.state.todos.map((todo, index) => (
						<View key={index} style={styles.todo}>
							<Text style={styles.name}>Items: {todo.name}</Text>
							<Text style={styles.name}>ZIP: {todo.zip}</Text>
							<Text style={styles.name}>Phone: {todo.phoneNumber}</Text>
						</View>
					))}
				</ScrollView>

				<TextInput
					isVisible={this.state.isVisible}
					style={styles.input}
					value={this.state.name}
					onChangeText={(val) => this.onChangeText('name', val)}
					placeholder="Items needed, seperated by commas. Ex: bread, eggs, water)"
				/>
				<TextInput
					isVisible={this.state.isVisible}
					style={styles.input}
					value={this.state.zip}
					onChangeText={(val) => this.onChangeText('zip', val)}
					placeholder="Enter ZIP Code"
				/>
				<TextInput
					isVisible={this.state.isVisible}
					style={styles.input}
					value={this.state.phoneNumber}
					onChangeText={(val) => this.onChangeText('phoneNumber', val)}
					placeholder="Enter best phone to text you at"
				/>
				<TouchableOpacity isVisible={this.state.isVisible} onPress={this.addInfo} style={styles.buttonContainer}>
					<Text style={styles.buttonText}>Add Info</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingTop: 50
	},
	input: {
		height: 50,
		borderBottomWidth: 2,
		borderBottomColor: 'orange',
		marginVertical: 10
	},
	buttonContainer: {
		backgroundColor: '#34495e',
		marginTop: 10,
		marginBottom: 10,
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
		borderBottomColor: '#ddd',
		paddingVertical: 10
	},
	name: { fontSize: 16 },

	scrollView: {
		backgroundColor: 'white',
		marginHorizontal: 20
	}
});
