import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class AuthComp extends React.Component {
	signOut = async () => {
		await Auth.signOut();
	  }
	componentDidMount = async () => {
		try {
			const { idToken: { payload: { email, sub: id } } } = await Auth.currentSession();

			console.log({ id, email });
		} catch (e) {
			console.log(e);
		}
	};
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.signOut} style={styles.buttonContainer}>
					<Text style={styles.buttonText}>Logout</Text>
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

export default AuthComp;
