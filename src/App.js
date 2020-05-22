import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { auth ,signInWithGoogle, createUserInDb } from './firebase/firebase.utils'


export class App extends Component{
  unsubscribeFromAuth = null;
  constructor(props){
    super(props);

    this.state = {
      other : { name : 'abbas' , age : '012345' }
    }
  }


  componentDidMount() {
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async signUser =>
     {
      await createUserInDb(signUser);
      this.setState({ user : signUser })
     })

     

  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        { this.state.user ? this.state.user.email : 'no one' } 
        <button onClick={signInWithGoogle}>signin</button>
        <button onClick={() => auth.signOut()}>signout</button>
      </div>
      );
  }

}

export default App;