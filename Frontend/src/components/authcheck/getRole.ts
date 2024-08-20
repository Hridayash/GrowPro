import {jwtDecode} from "jwt-decode";

// Define TypeScript interfaces for the decoded token
interface DecodedToken {
  role: string;
  userId: string;
}

const getUserRole = (): string | null => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const getUserId = (): string | null => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export { getUserId };
export default getUserRole;
