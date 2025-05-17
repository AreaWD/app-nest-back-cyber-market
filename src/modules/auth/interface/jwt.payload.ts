export interface JwtPayload {
  sub: number;
  email: string;
  role: {
    id: number;
    name: string;
  };
}
