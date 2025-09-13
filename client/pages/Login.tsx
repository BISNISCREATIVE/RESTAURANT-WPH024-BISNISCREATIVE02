import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginApi, getProfileApi } from "@/services/api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi({ email, password });
      const token = res.token || res.accessToken || res.data?.token;
      if (!token) throw new Error("Login gagal");
      localStorage.setItem("token", token);
      // fetch profile (optional)
      try { await getProfileApi(); } catch {}
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <img src="/placeholder.svg" alt="Food" className="hidden lg:block object-cover w-full h-full" />
      <div className="flex items-center justify-center p-6">
        <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
          <div className="text-2xl font-extrabold">Foody</div>
          <div>
            <div className="text-xl font-bold">Welcome Back</div>
            <div className="text-sm text-muted-foreground">Good to see you again! Let’s eat</div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <Input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <Button type="submit" className="w-full" disabled={loading}>{loading?"Signing in...":"Login"}</Button>
        </form>
      </div>
    </div>
  );
}
