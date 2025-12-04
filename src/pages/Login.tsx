import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Gift, Snowflake as SnowflakeIcon } from "lucide-react";
import { SnowEffect } from "@/components/SnowEffect";

import { API_URL } from "@/config";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.user));
                toast.success("Welcome to the North Pole! 🎅");
                navigate("/dashboard");
            } else {
                toast.error(data.message || "Naughty list? Invalid credentials.");
            }
        } catch (error) {
            toast.error("The elves are on break. Server error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <SnowEffect />
            <div className="frost-overlay" />

            <Card className="w-full max-w-md glass-panel border-none relative z-10 mx-4">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4 relative">
                        <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 rounded-full"></div>
                        <div className="p-4 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg relative">
                            <Gift className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-4xl font-bold tracking-tight text-white text-shadow-glow">
                        Secret Santa
                    </CardTitle>
                    <CardDescription className="text-blue-100 text-lg font-light">
                        Lets be a santa today 🎅
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-blue-100">Elf Name (Username)</Label>
                            <Input
                                id="username"
                                placeholder="e.g. kumrisha"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-red-400 focus:ring-red-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-blue-100">Secret Code (Password)</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-red-400 focus:ring-red-400"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-6 text-lg shadow-lg shadow-red-900/50 border border-red-400/30 transition-all duration-300 hover:scale-[1.02]"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <SnowflakeIcon className="w-5 h-5 animate-spin" />
                                    Checking List...
                                </span>
                            ) : (
                                "Open the Door"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
