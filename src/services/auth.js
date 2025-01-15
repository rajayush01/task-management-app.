export const loginUser = async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username && credentials.password) {
          resolve({
            token: 'mock-jwt-token',
            user: { name: credentials.username, email: 'user@example.com' },
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  
  export const registerUser = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.username && userData.email && userData.password) {
          resolve({
            token: 'mock-jwt-token',
            user: { name: userData.username, email: userData.email },
          });
        } else {
          reject(new Error('Registration failed'));
        }
      }, 1000);
    });
  };