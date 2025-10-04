import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Droplets, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome back to WaterSquares!",
      });

      // Check if it's admin login
      if (formData) {
        navigate("/dashboard");
      }
    }, 1500);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4 bg-white"
      style={{
        backgroundImage: "url('/Water.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-full max-w-md border border-[#1B3C53] bg-[#1B3C53]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-[#1B3C53] rounded-full flex items-center justify-center">
              <Droplets className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
          <CardDescription className="text-white">
            Sign in to your WaterSquares account to manage your water deliveries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                className="bg-white text-black"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  className="bg-white text-black"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-black" />
                  ) : (
                    <Eye className="h-4 w-4 text-black" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleChange("rememberMe", checked === true)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm hover:underline text-white/50"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full text-[#1B3C53] bg-white"
              disabled={isLoading}
            >
              {isLoading ? "Loading...." : "Sign In"}
            </Button>

            <div className="text-center text-white/50 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-white hover:underline">
                Sign up here
              </Link>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center text-white text-sm text-muted-foreground mb-4">
              Demo Accounts:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Button
                className="border border-white bg-transparent text-white"
                size="sm"
                onClick={() => setFormData({
                  email: "admin@WaterSquares.com",
                  password: "admin123",
                  rememberMe: false
                })}
              >
                Admin Login
              </Button>
              <Button
                className="border border-white bg-transparent text-white"
                size="sm"
                onClick={() => setFormData({
                  email: "customer@example.com",
                  password: "customer123",
                  rememberMe: false
                })}
              >
                Customer Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}