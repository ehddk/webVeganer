export async function signUp(email: string, password: string) {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {email, password} ),
      });
      console.log("Response status:", response);
  
      if (!response.ok) {
        let errorMessage = "회원가입에 실패했습니다.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error("Error parsing JSON:", e);
        }
        throw new Error(errorMessage);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Sign-up failed:", error);
      throw error;
    }
  }
  