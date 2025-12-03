import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Gift, LogOut, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { SnowEffect } from "@/components/SnowEffect";

interface User {
    name: string;
    username: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [spinning, setSpinning] = useState(false);
    const [assignedTo, setAssignedTo] = useState<User | null>(null);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchUsers();
        checkExistingAssignment(parsedUser.username);
    }, [navigate]);

    const checkExistingAssignment = async (username: string) => {
        try {
            const response = await fetch(`${API_URL}/api/assignment/${username}`);
            const data = await response.json();
            if (data.exists) {
                setAssignedTo({ name: data.assignment.receiverName, username: data.assignment.receiver });
            }
        } catch (error) {
            console.error("Failed to check assignment", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/api/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            toast.error("Failed to load users.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const spinWheel = async () => {
        if (!user || users.length === 0) return;

        const potentialReceivers = users.filter(u => u.username !== user.username);

        if (potentialReceivers.length === 0) {
            toast.error("No other users to assign to!");
            return;
        }

        setSpinning(true);
        setAssignedTo(null);

        // Pre-select the winner
        const winnerIndex = Math.floor(Math.random() * potentialReceivers.length);
        const winner = potentialReceivers[winnerIndex];

        let speed = 50; // Start fast
        let steps = 0;
        const minSteps = 30; // Minimum spins

        const runSpin = () => {
            steps++;

            // Visual update
            const visualIndex = Math.floor(Math.random() * potentialReceivers.length);
            setAssignedTo(potentialReceivers[visualIndex]);

            // Decaying speed logic (Russian Roulette feel)
            if (steps < minSteps || speed < 300) {
                // Keep spinning
                if (steps > minSteps) {
                    speed = Math.floor(speed * 1.1); // Slow down exponentially
                }
                setTimeout(runSpin, speed);
            } else {
                // Final stop
                setAssignedTo(winner);
                finalizeAssignment(winner);
            }
        };

        runSpin();
    };

    const finalizeAssignment = async (selectedUser: User) => {
        setSpinning(false);

        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ef4444', '#22c55e', '#fbbf24']
        });

        try {
            const response = await fetch(`${API_URL}/api/assign`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    giver: user?.username,
                    receiver: selectedUser.username
                }),
            });

            const data = await response.json();
            if (data.success) {
                toast.success(`You are Secret Santa for ${selectedUser.name}! 🎁`);
            } else {
                toast.error("Failed to save assignment.");
            }
        } catch (error) {
            toast.error("Error saving assignment.");
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen relative overflow-hidden">
            <SnowEffect />
            <div className="frost-overlay" />

            <nav className="relative z-10 flex justify-between items-center max-w-6xl mx-auto mb-8 bg-white/10 backdrop-blur-md p-4 rounded-b-xl text-white border-b border-white/20 shadow-lg">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-red-600 rounded-full shadow-inner">
                        <Gift className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl font-christmas tracking-wide">Secret Santa</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-blue-100">Hello, <span className="font-bold text-white">{user.name}</span></span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="hover:bg-white/20 hover:text-white text-blue-100"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </nav>

            <main className="relative z-10 max-w-2xl mx-auto text-center px-4">
                <Card className="glass-panel border-none overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-4xl font-bold text-white text-shadow-glow font-christmas">Find Your Match!</CardTitle>
                        <CardDescription className="text-blue-100 text-lg">Spin the wheel to discover who you'll be gifting this year.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-12 space-y-8">

                        <div className="relative w-72 h-72 flex items-center justify-center">
                            {/* Decorative circles */}
                            <div className={`absolute inset-0 border-8 border-dashed border-red-500/30 rounded-full ${spinning ? 'animate-spin-slow' : ''}`}></div>
                            <div className="absolute inset-4 border-4 border-green-400/20 rounded-full"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"></div>

                            {/* Result Display */}
                            <div className="z-10 text-center">
                                {assignedTo ? (
                                    <div className="animate-in zoom-in duration-500">
                                        <p className="text-sm text-blue-200 uppercase tracking-wider mb-2 font-semibold">Your Target</p>
                                        <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-green-400 drop-shadow-lg font-christmas">
                                            {assignedTo.name}
                                        </h2>
                                    </div>
                                ) : (
                                    <Gift className="w-32 h-32 text-white/20" />
                                )}
                            </div>
                        </div>

                        <Button
                            size="lg"
                            onClick={spinWheel}
                            disabled={spinning || !!assignedTo}
                            className={`
                text-xl px-12 py-8 rounded-full font-bold shadow-xl transform transition-all duration-300
                ${assignedTo
                                    ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed border border-gray-500/50'
                                    : 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 hover:scale-105 hover:shadow-green-500/50 text-white border border-green-400/30'
                                }
              `}
                        >
                            {spinning ? (
                                <span className="flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 animate-spin" />
                                    Spinning...
                                </span>
                            ) : assignedTo ? (
                                "Assignment Complete"
                            ) : (
                                "Spin the Wheel"
                            )}
                        </Button>

                        {assignedTo && !spinning && (
                            <div className="p-4 bg-white/10 rounded-lg border border-white/10 animate-in fade-in slide-in-from-bottom-4">
                                <p className="text-blue-100">
                                    Don't tell anyone! It's a secret. 🤫
                                </p>
                            </div>
                        )}

                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
