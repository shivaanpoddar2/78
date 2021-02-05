import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView, keyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import SantaAnimation from '../component/SantaClaus'
export default class WelcomeScreen extends React.Component{
    constructor(){
        super()
        this.state={
            emailId:'',
            password:'',
            isModalVisible:'false',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:''
        }
    }
    userSignUp=(emailId,password,confirmPassword)=>{
        if (password!==confirmPassword){return alert('password does not match. Check password')}
        else{
        firebase.auth().createUserWithEmailAndPassword(emailId,password)
        .then(()=>{
            db.collection('users').add({
                first_name:this.state.firstName,
                last_name:this.state.lastName,
                contact:this.state.contact,
                email_Id:this.state.emailId,
                address:this.state.address
            }) 
            return alert('user added successfully',[{text:'ok',onPress:()=>this.setState({'isModalVisible':false})}])
        })
        .catch(function(error){
            var errorCode = error.code
            var errorMessage=error.message
            return alert(errorMessage)
        })
    }
}
    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(Response=>{
             return alert("successfully loged in")
        })
        .catch(function(error){
            var errorCode = error.code
            var errorMessage=error.message
            return alert(errorMessage)
        })
    }
    showModal=()=>{
        return(
            <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.isModalVisible}
            >
                <View>
                    <ScrollView>
                        <keyboardAvoidingView>
                            <Text>registration</Text>
                            <TextInput
                    placeholder="firstName"
                    maxLength={8}
                    onChangeText={(text)=>{
                      this.setState({
                          firstName:text
                      })
                    }}
                    >
                        

                    </TextInput>
                    <TextInput
                    placeholder="lastName"
                    maxLength={8}
                    onChangeText={(text)=>{
                      this.setState({
                          lastName:text
                      })
                    }}
                    >
                        

                    </TextInput>
                    <TextInput
                    placeholder="contact"
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={(text)=>{
                      this.setState({
                         contact:text
                      })
                    }}
                    >
                        

                    </TextInput>
                    <TextInput
                    placeholder="yourAddress"
                    multiline={true}
                    onChangeText={(text)=>{
                      this.setState({
                          address:text
                      })
                    }}
                    >
                        

                    </TextInput>
                    <TextInput
                    placeholder="abc@example.com"
                    keyboardType="email-adress"
                    onChangeText={(text)=>{
                      this.setState({
                          emailId:text
                      })
                    }}
                    >
                        

                    </TextInput>
                    <TextInput
                    placeholder="enter password"
                    sceureTextEntry={true}
                    onChangeText={(text)=>{
                      this.setState({
                          password:text
                      })
                    }}
                    >
                        

                    </TextInput>
                    <TextInput
                    placeholder="confirm password"
                    sceureTextEntry={true}
                    onChangeText={(text)=>{
                      this.setState({
                          confirmPassword:text
                      })
                    }}
                    >
                        

                    </TextInput>
                    <TouchableOpacity
                    onPress={()=>{
                        this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                    }}
                    >
                        <Text>Registration</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>{
                        this.setState({'isModalVisible':false})
                    }}
                    >
                        <Text>Cancle</Text>
                    </TouchableOpacity>
                        </keyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    render(){
        return(
            <View>
                <View style={{justifyContent:'center', alignItems:'center'}}></View>
                    {this.showModal()}
                
                <Text>Barter App</Text>
                <View>
                    <TextInput
                    placeholder="abc@example.com"
                    keyboardType="email-adress"
                    onChangeText={(text)=>{
                      this.setState({
                          emailId:text
                      })
                    }}
                    >
                        

                    </TextInput>
                    <TextInput
                    placeholder="enter password"
                    sceureTextEntry={true}
                    onChangeText={(text)=>{
                      this.setState({
                          password:text
                      })
                    }}
                    >
                        

                    </TextInput>
                    <TouchableOpacity
                    onPress={()=>{
                        this.userLogin(this.state.emailId,this.state.password)
                    }}
                    >
                        <Text>sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>
                        this.setState({isModalVisible:true})
                    }
                    >
                        <Text>sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>     
        )
    }
}