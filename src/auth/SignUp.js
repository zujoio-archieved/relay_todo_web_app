import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
// import { View, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native'
import { useMutation, } from 'relay-hooks'
// import { ROUTES_CONSTANTS } from '../../AppNavigation'
import graphql from 'babel-plugin-relay/macro'
import { ROUTES_CONSTANTS } from '../navigation/AppRouter'

const SignUp = (props) => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [mutate, { loading, data, error }] = useMutation(
        graphql`
        mutation SignUpMutation($input: registerInput!) {
        register(input:$input) {
            status
            message
            clientMutationId
        }
    } 
    `,
        {
            onCompleted: ({ register }) => {
                const { status, message } = register
                if (status === "SUCCESS") {
                    setEmail("")
                    setPassword("")
                    setFirstName("")
                    setLastName("")
                    const confirm = window.confirm(message)
                    if (confirm) {
                        history.push(ROUTES_CONSTANTS.SIGN_IN)
                    }
                } else {
                    alert(message)
                }
            }
        })

    const _signUp = () => {
        mutate({
            variables: {
                input: {
                    email,
                    password,
                    firstName,
                    lastName,
                }
            }
        })
    }

    const _renderFormInput = (placeholder, value, setter, type = "text") => {
        return (
            <div>
                <input
                    placeholder={placeholder}
                    value={value}
                    onChange={e => {
                        setter(e.target.value)
                    }}
                    type={type}
                />
            </div>
        )
    }

    return (
        <div >
            <div>
                {_renderFormInput("Email", email, setEmail, "email")}
                {_renderFormInput("Password", password, setPassword, "password")}
                {_renderFormInput("First Name", firstName, setFirstName, "text")}
                {_renderFormInput("Last Name", lastName, setLastName, "text")}
            </div>
            <button disabled={loading} title="" onClick={_signUp} >Sign Up</button>
            <Link to={ROUTES_CONSTANTS.SIGN_IN}  >Sign In?</Link>
            {/* <TouchableOpacity onPress={() => { props.navigation.navigate(ROUTES_CONSTANTS.SIGN_IN) }}><Text>sign in?</Text></TouchableOpacity> */}

        </div>
    )
}

export default SignUp
