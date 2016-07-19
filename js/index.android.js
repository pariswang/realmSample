/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator,
	TouchableOpacity 
} from 'react-native';

const R = require('./RemoteRequest.js');
const realm = require('./Realm.js');

const actions = {
	fetch:()=>{
		R({
			action:''
		},function(res){
			console.warn(4);
		}, function(err){
			console.warn(err);
		});
	},
};

class RealmSample extends Component {
	constructor(props){
		super(props);
		this.update = ()=>{
			this.forceUpdate();
		};
		this.onFlush = this.onFlush.bind(this);
	}
	componentDidMount(){
		actions.fetch();
		realm.addListener('change', this.update);
	}
	componentWillUnmount(){
		realm.removeListener('change', this.update);
	}
	onFlush(){
		const { navigator } = this.props;
		if(navigator) {
            navigator.push({
                name: 'SecondPageComponent',
                component: SecondPageComponent,
            })
        }
		//this.forceUpdate();
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Count of Dogs in Realm: {realm.objects('Dog').length}
				</Text>
				<Text onPress={this.onFlush}>刷新</Text>
			</View>
		);
	}
}

class SecondPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
            navigator.pop();
        }
    }

    render() {
    return (
            <View>
                <TouchableOpacity onPress={this._pressButton.bind(this)}>
                    <Text>点我跳回去</Text>
                </TouchableOpacity>
            </View>
    );
    }
}

class SampleComponent extends React.Component {
	render() {
		let defaultName = 'RealmSample';
		let defaultComponent = RealmSample;
		return (
		<Navigator
		  initialRoute={{ name: defaultName, component: defaultComponent }}
		  configureScene={(route) => {
			return Navigator.SceneConfigs.VerticalDownSwipeJump;
		  }}
		  renderScene={(route, navigator) => {
			let Component = route.component;
			return <Component {...route.params} navigator={navigator} />
		  }} />
		);
	}
} 

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

AppRegistry.registerComponent('RealmSample', () => SampleComponent);
