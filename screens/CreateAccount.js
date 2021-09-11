import React, { useEffect, useRef } from "react";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShare";
import AuthLayout from "../components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const CREATEACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { register, handleSubmit, getValues, setValue, setError } = useForm();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
      return;
    }
    navigation.navigate("Login", {
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATEACCOUNT_MUTATION, {
    onCompleted,
  });

  const onValid = (data) => {
    if (loading) {
      return;
    }
    const { firstName, lastName, email, username, password } = getValues();
    createAccount({
      variables: {
        firstName,
        lastName,
        email,
        username,
        password,
      },
    });
  };

  const onInvalid = (errorMsg) => {
    console.log(errorMsg);
  };

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  useEffect(() => {
    register("firstName", {
      required: "First name is required.",
    });
    register("lastName");
    register("username", {
      required: "Username is required.",
      minLength: {
        value: 5,
        message: "Username should be longer than 5 chars.",
      },
    });
    register("email", {
      required: "Email is required.",
    });
    register("password", {
      minLength: {
        value: 8,
        message: "Password should be longer than 8 chars.",
      },
      required: "Password is required.",
    });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        autoFocus
        placeholder="First Name"
        autoCapitalize="characters"
        placeholderTextColor={colors.gray}
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => setValue("firstName", text)}
      />
      <TextInput
        ref={lastNameRef}
        autoCapitalize="characters"
        placeholder="Last Name"
        placeholderTextColor={colors.gray}
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue("lastName", text)}
      />
      <TextInput
        ref={usernameRef}
        autoCapitalize="none"
        placeholder="Username"
        placeholderTextColor={colors.gray}
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor={colors.gray}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={colors.gray}
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid, onInvalid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Create Account"
        loading={loading}
        disabled={loading}
        onPress={handleSubmit(onValid, onInvalid)}
      />
    </AuthLayout>
  );
}
