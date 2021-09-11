import React, { useEffect, useRef } from "react";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShare";
import AuthLayout from "../components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  const { register, handleSubmit, setValue, setError, formState, watch } =
    useForm({
      defaultValues: {
        username: params?.username,
        password: params?.password,
      },
    });
  const usernameRef = useRef();
  const passwordRef = useRef();

  const onCompleted = async (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
      return;
    }
    if (token) {
      await logUserIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = data;
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const onInvalid = () => {};

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  useEffect(() => {
    register("username", {
      required: "Username is required.",
      minLength: {
        value: 5,
        message: "Username should be longer than 5 chars.",
      },
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
        autoCapitalize="none"
        ref={usernameRef}
        value={watch("username")}
        placeholder="Username"
        placeholderTextColor={colors.gray}
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={colors.gray}
        value={watch("password")}
        secureTextEntry
        lastOne={true}
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onValid, onInvalid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Log in"
        loading={loading}
        disabled={!watch("username") || !watch("password") || loading}
        onPress={handleSubmit(onValid, onInvalid)}
      />
    </AuthLayout>
  );
}
