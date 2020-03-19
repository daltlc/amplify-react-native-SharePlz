import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { listTodos } from '../src/graphql/queries';
import { createTodo } from '../src/graphql/mutations';
import { API, graphqlOperation } from "aws-amplify"
export default class App extends React.Component {
	state = {
		name: '',
		todos: []
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

	addTodo = async (event) => {
		const { name, todos } = this.state;

		event.preventDefault();

		const input = {
			name
		};

		const result = await API.graphql(graphqlOperation(createTodo, { input }));

		const newTodo = result.data.createTodo;
		const updatedTodo = [ newTodo, ...todos ];
		this.setState({ todos: updatedTodo, name: '' });
	};

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					value={this.state.name}
					onChangeText={(val) => this.onChangeText('name', val)}
					placeholder="Add a Todo"
				/>
				<TouchableOpacity onPress={this.addTodo} style={styles.buttonContainer}>
					<Text style={styles.buttonText}>Add +</Text>
				</TouchableOpacity>

				{this.state.todos.map((todo, index) => (
					<View key={index} style={styles.todo}>
						<Text style={styles.name}>{todo.name}</Text>
					</View>
				))}
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
		borderBottomColor: 'blue',
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
	name: { fontSize: 16 }
});
