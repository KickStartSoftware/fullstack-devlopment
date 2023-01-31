import React from 'react';
import {
  Box,
  Button,
  Input,
  Typography,
  StyledLink,
} from '../../components/base';
import PublicLayout from '../../components/layout/public';
import { useAuthContext } from '../../context/authContext';
import { FormEvent, InputEvent } from '../../@types/events';

function Signup() {
  const authContext = useAuthContext();
  const [info, setinfo] = React.useState({
    email: '',
    username: '',
    password: '',
  });

  const handleInputChange = (e: InputEvent) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };

  const resetState = () => {
    setinfo({
      ...info,
      [info.email]: '',
      [info.username]: '',
      [info.password]: '',
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!info.email || !info.username || !info.password) {
      return alert('Please fill in all the fields');
    }
    authContext?.signUp(info.email, info.username, info.password, resetState);
  };

  return (
    <PublicLayout containerClass="px-4" showFooter={false} hideLinks>
      <Box center width="xs" classname="mt-10 md:mt-16">
        <Typography
          variant="h3"
          weight="regular"
          textAlign="center"
          text="Sign up on Kickstart"
          gutterBottom="default"
          classname="mb-10"
        />
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            name="username"
            label="Username"
            gutterBottom="xl"
            value={info.username}
            onChange={handleInputChange}
            placeholder="Please enter a username"
          />
          <Input
            type="email"
            name="email"
            label="Email"
            gutterBottom="xl"
            value={info.email}
            onChange={handleInputChange}
            placeholder="Please enter your email"
          />
          <Input
            type="password"
            name="password"
            label="Password"
            gutterBottom="xl"
            value={info.password}
            onChange={handleInputChange}
            placeholder="Please enter your password"
          />
          <Button
            fullwidth
            type="submit"
            text="Register"
            gutterTop="sm"
            disabled={authContext?.loading}
            loading={authContext?.loading}
          />
        </form>
        <Box classname="px-2 md:px-6 mt-10 flex items-center gap-x-4 justify-center pb-10">
          <Typography
            as="p"
            weight="medium"
            variant="subBody"
            gutterBottom="none"
            text="Already have an account ?"
          />
          <StyledLink classname="text-sm" href="/auth/sign-in">
            login
          </StyledLink>
        </Box>
      </Box>
    </PublicLayout>
  );
}

export default Signup;
