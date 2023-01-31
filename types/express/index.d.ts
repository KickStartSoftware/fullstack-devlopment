declare namespace Express {
  interface Request {
    user: {
      id: string;
      role: UserRole;
      email: string;
      isVerified: boolean;
    };
  }
}
