import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import { useMutation } from 'relay-hooks'
import graphql from 'babel-plugin-relay/macro'
// import { ROUTES_CONSTANTS } from '../../AppNavigation'
import { useEnvironmentContext } from '../environmentContextDef'
import { LocalStorage } from '../utils/localstorage'
import { ROUTES_CONSTANTS } from '../navigation/AppRouter'

const SignIn = (props) => {
    const { resetEnvironment } = useEnvironmentContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const [mutate, { loading, data, error }] = useMutation(graphql`
    mutation SignInMutation($input: loginInput!) {
        login(input:$input) {
            status
            message
            token
            clientMutationId
        }
    } 
    `,
        {
            onCompleted: async ({ login }) => {
                const { status, message, token } = login
                if (status === "SUCCESS" && token) {
                    setEmail("")
                    setPassword("")

                    await Promise.all([
                        LocalStorage.storeToken(token),
                        resetEnvironment()
                    ]);

                    // props.navigation.navigate(ROUTES_CONSTANTS.TODOS)
                } else {
                    window.alert(message)
                }

            }, onError: error => { }
        }
    )

    const _signIn = () => {
        mutate({
            variables: {
                input: {
                    email,
                    password
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
            </div>
            <button disabled={loading} onClick={_signIn} >Sign In</button>
            <Link to={ROUTES_CONSTANTS.SIGN_UP}  >Sign Up?</Link>
            {/* <TouchableOpacity onPress={() => { props.navigation.navigate(ROUTES_CONSTANTS.SIGN_UP) }}><Text>sign up?</Text></TouchableOpacity> */}

        </div>
    )
}

export default SignIn


// import React from 'react'

// const SignIn = () => {
//     return (
//         <div>
//             SignIn
//         </div>
//     )
// }

// export default SignIn
