import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import { useMutation } from "relay-hooks";
import graphql from "babel-plugin-relay/macro";
// import { ROUTES_CONSTANTS } from '../../AppNavigation'
import { useEnvironmentContext } from "../environmentContextDef";
import { LocalStorage } from "../utils/localstorage";
import { ROUTES_CONSTANTS } from "../navigation/AppRouter";
import { Color } from "../utils/color";

const SignIn = props => {
  const history = useHistory();
  const { resetEnvironment } = useEnvironmentContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mutate, { loading, data, error }] = useMutation(
    graphql`
      mutation SignInMutation($input: loginInput!) {
        login(input: $input) {
          status
          message
          token
          clientMutationId
        }
      }
    `,
    {
      onCompleted: async ({ login }) => {
        const { status, message, token } = login;
        if (status === "SUCCESS" && token) {
          setEmail("");
          setPassword("");

          await Promise.all([
            LocalStorage.storeToken(token),
            resetEnvironment()
          ]);
          const confirm = window.confirm(message);
          if (confirm) {
            history.push(ROUTES_CONSTANTS.TODOS);
          }
          // props.navigation.navigate(ROUTES_CONSTANTS.TODOS)
        } else {
          window.alert(message);
        }
      },
      onError: error => {}
    }
  );

  const _signIn = () => {
    mutate({
      variables: {
        input: {
          email,
          password
        }
      }
    });
  };

  const _renderFormInput = (placeholder, value, setter, type = "text") => {
    return (
      <div>
        <input
          style={{
            color: `${Color.PRIMARY}`,
            position: "relative",
            lineHeight: 2,
            padding: 10,
            width: "400px",
            marginTop: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.003)",
            border: `1px solid ${Color.PRIMARY}`
          }}
          placeholder={placeholder}
          value={value}
          onChange={e => {
            setter(e.target.value);
          }}
          type={type}
          required={true}
        />
      </div>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1
        style={{
          width: "100%",
          fontSize: "80px",
          fontWeight: "bold",
          textAlign: "center",
          color: `${Color.PRIMARY}`
        }}
      >
        Sign in
      </h1>

      <form style={{ textAlign: "center" }}>
        {_renderFormInput("Email", email, setEmail, "email")}
        {_renderFormInput("Password", password, setPassword, "password")}

        <button
          style={{
            backgroundColor: `${Color.PRIMARY}`,
            padding: "15px 32px",
            textAlign: "center",
            fontSize: "16px",
            border: "none",
            marginTop: "10px",
            color: "white"
          }}
          disabled={loading}
          type="submit"
          onClick={_signIn}
        >
          Sign In
        </button>
      </form>
      <div style={{ marginTop: "10px" }}>
        <Link
          style={{ textDecoration: "none", color: `${Color.PRIMARY}` }}
          to={ROUTES_CONSTANTS.SIGN_UP}
        >
          Sign Up ?
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
