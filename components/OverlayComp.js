import React from 'react';
import { Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements'
export default class OverlayComp extends React.Component {
	state = {
		isVisible: true
	};
	render() {
		return (
			<Overlay style={styles.overlay} isVisible={this.state.isVisible} onBackdropPress={() => this.setState({ isVisible: false })}>
				<Text style={styles.overlayTitle}>
					Welcome to SharePlz
					{"\n"}
				</Text>
				<Text style={styles.overlayInstructions}>
					This applications is ment for emergency use to share things in neighborhoods if supplies became dangerously low. 
				</Text>
				<Text style={styles.overlayInstructions}>
					You will list what you need, your ZIP code and phone number. This will let people see individuals close to their own ZIP code.
					{"\n"}
					{"\n"}
					You will be limited to one post per day.
					{"\n"}
					{"\n"}
					Thanks for the support, stay safe everyone!
				</Text>
				<TouchableOpacity onPress={() => this.setState({ isVisible: false })} style={styles.buttonContainer}>
					<Text style={styles.buttonText}>Okay, got it!</Text>
				</TouchableOpacity>
			</Overlay>
		);
	}
}

const styles = StyleSheet.create({
	overlay: {
	  flex: 1,
	  backgroundColor: '#fff',
	},
	overlayTitle: {
		fontSize: 20,
		textAlign: 'center',
		paddingTop:20,
		fontWeight: 'bold'
	},
	overlayInstructions: {
		fontSize: 16,
		textAlign: 'center',
		padding: 10
	},
	buttonContainer: {
		backgroundColor: '#FFAC31',
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 24
	},
  });
