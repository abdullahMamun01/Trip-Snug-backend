

export type DecodedJWT = {
    email: string;
    name: string;
    role: string;
    iat: number; // Issued At
    exp: number; // Expiration Time
  }
  
