import jwt_decode from 'jwt-decode';

declare module 'jwt-decode' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export default function jwt_decode(token: string): any; // Replace `any` with a more specific type if known
}




