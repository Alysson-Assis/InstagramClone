import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'


import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getFirestore,setDoc, doc } from 'firebase/firestore';


export class Register extends Component {
    constructor(props) {
         super(props);

         this.state = {
            email : '',
            password : '',
            name : '' 
         }
         this.onSignUp = this.onSignUp.bind(this)
         
    }
    onSignUp() {
        const auth = getAuth()
        const db = getFirestore()
        const { email, password, name } = this.state;
        createUserWithEmailAndPassword(auth, email, password ) 
        // dados do usuário ok
        
           .then(async (userCredencial) => {
                const user = userCredencial.user;
                const uid = user.uid
                console.log(user)

                try {
                    const docRef = await setDoc(doc(db, "users", uid), {
                    name: name,
                    email: email,
                    });


                }catch (e) {
                    console.error("Error: ", e)
                }                        
            })
            .catch((error) => {
                console.log(error)
        })
    }

    render() {
        return (
        <View>
            <TextInput 
                placeholder='name'
                onChangeText={ (name) => this.setState( { name })}
            />
            <TextInput 
                placeholder='email'
                onChangeText={ (email) => this.setState( { email })}
            />
            <TextInput 
                placeholder='password'
                secureTextEntry={true}
                onChangeText={ (password) => this.setState( { password })}
            />          

            <Button
                onPress={() => this.onSignUp()}
                title='Sign Up'    
            />
        </View>
        )
  }
}

export default Register
