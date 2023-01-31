import axios from 'axios';

const authClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`,
});

export default authClient;
