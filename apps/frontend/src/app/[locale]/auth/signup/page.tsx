// app/[local]/auth/Signup/page.tsx
import React from 'react';
import AuthLayout from './layout'; // local layout (same as SignIn)
import SignUpForm from './SignUpForm'; // your SignUp form component
import '../styles/globals.css'; // same pattern used in SignIn

export default function SignUpPage() {
  return (
    <AuthLayout title="Create an Account">
      <SignUpForm />
    </AuthLayout>
  );
}