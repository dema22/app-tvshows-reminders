/*The issue is jwtDecode is unaware of what is inside your token, as it could be anything. 
Because of this, it uses the type unknown to signify that result of the decoded JWT is, unknown.
To get around this you will need to create an interface describing what you expect to be in your JWT 
and tell jwtDecode to use it as the return type of the decoded token.
*/

export interface Token {
  sub: string;
  iat: number;
  exp: number;
}
