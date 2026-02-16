import api from "../api";

export default function Login() {
  const login = async () => {
    const res = await api.post("/auth/login", {
      email: "manager@test.com",
      password: "123456"
    });
    localStorage.setItem("token", res.data.token);
    window.location.reload();
  };

  return <button onClick={login}>Login</button>;
}
