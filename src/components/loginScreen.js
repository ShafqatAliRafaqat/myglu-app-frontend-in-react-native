import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as actions from '../Store/Actions/AuthActions';
class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitting: false,
      processing: false,
    };
  }
  moveToHome = () => {
    NavigationService.navigateAndResetStack("TabScreens");
  };
  toggleSubmitting = () => {
    const { submitting } = this.state;
    this.setState({
      submitting: !submitting,
    });
  };

  toggleProcessing = () => {
    const { processing } = this.state;
    this.setState({
      processing: !processing,
    });
  };
  login = () => {
    const { login } = this.props;

    const { email, password } = this.state;
    if (!email) {
      return alert('Email is required.');
    }

    if (!password) {
      return alert('Password is required.');
    }

    this.toggleSubmitting();

    login({
      data: { email, password },
      onSuccess: () => {
        this.moveToHome();
      },
      onError: (message) => {
        alert(message);
        this.toggleSubmitting();
      }
    });

  }
  render(){
    const { email, password, submitting, processing } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>My Glu</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            value={email}
            onChangeText={email => this.setState({ email })}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            value={password}
            onChangeText={password => this.setState({ password })}
            />
        </View>
        
        <TouchableOpacity style={styles.loginBtn}>
          <Button disabled={submitting} onPress={this.login} >{submitting ? 'Please wait...' : 'Sign In'}</Button>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});
export default connect(
  null,
  {
    login: actions.login,
  }
)(Setup);