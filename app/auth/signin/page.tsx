
"use client";
import * as React from 'react';
import { SignInPage } from '@toolpad/core/SignInPage';

import { providerMap } from '../../../auth';
import Alert from '@mui/material/Alert';
import signIn from './actions';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles'

function DemoInfo() {
  return (
    <Alert severity="info">
      You can use <strong>toolpad-demo@mui.com</strong> with the password <strong>@demo1</strong> to
      test
    </Alert>
  );
}

function rememberMeNull() {
  const theme = useTheme();
  
  return (
    <FormControlLabel control=
    {<TextField label='Username'
      placeholder=''
      id='username-passkey'
      name='username'
      type='search'
      size="small"
      fullWidth={true}
      sx={{
        fontSize: "10px"
      }}
    />} label="" 
    sx={{
      width: '100%',
      lineHeight: theme.typography.pxToRem(12),
      fontSize: theme.typography.pxToRem(14),

    }}
    />
  )
}

export default function SignIn() {

  return (
    <SignInPage
      providers={providerMap}
      signIn={signIn}
      // slotProps={}
      slots={{
        // forgotPasswordLink: ForgotPasswordLink,
        // signUpLink: SignUpLink,
        rememberMe: rememberMeNull,
        subtitle: DemoInfo,
      }}
    />
  );
}