import React from 'react';
import PublicLayout from '../../components/layout/public';
import {
  Box,
  Button,
  Input,
  Typography,
  StyledLink,
} from '../../components/base';
import { FormEvent, InputEvent } from '../../@types/events';
import { useAuthContext } from '../../context/authContext';

function Login() {
  const authContext = useAuthContext();
  const [info, setinfo] = React.useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: InputEvent) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };

  const resetState = () => {
    setinfo({
      ...info,
      [info.email]: '',
      [info.password]: '',
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!info.email || !info.password) {
      return alert('Please fill in all the fields');
    }
    authContext?.login(info.email, info.password, resetState);
  };
  return (
    <PublicLayout containerClass="px-4" showFooter={false} hideLinks>
      <Box center width="xs" classname="mt-10 md:mt-16">
        <Typography
          variant="h3"
          weight="regular"
          textAlign="center"
          text="Sign in to Kickstart"
          gutterBottom="default"
          classname="mb-10"
        />
        <form onSubmit={onSubmit}>
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
          <Box classname="flex justify-end">
            <StyledLink href="/">
              <Typography
                as="p"
                variant="subBody"
                textAlign="right"
                text="Forgot password?"
                gutterBottom="xl"
              />
            </StyledLink>
          </Box>
          <Button
            disabled={authContext?.loading}
            loading={authContext?.loading}
            type="submit"
            text="Login"
            fullwidth
          />
        </form>
        <Box classname="px-2 md:px-6 mt-10 flex items-center gap-x-4 justify-center pb-10">
          <Typography
            as="p"
            weight="medium"
            variant="subBody"
            gutterBottom="none"
            text="Not yet registered ?"
          />
          <StyledLink classname="text-sm" href="/auth/sign-up">
            Register
          </StyledLink>
        </Box>
      </Box>
    </PublicLayout>
  );
}

export default Login;
