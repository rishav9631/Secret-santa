import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lock, Unlock } from "lucide-react";
import { SnowEffect } from "@/components/SnowEffect";
import { format } from "date-fns";
import { API_URL } from "@/config";

interface Assignment {
    _id: string;
    giver: string;
    giverName: string;
    receiver: string;
    receiverName: string;
    timestamp: string;
}

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "Roof@70253#$") {
            setIsAuthenticated(true);
            fetchAssignments();
        } else {
            alert("Wrong password! The elves are watching you. 👀");
        }
    };

    const fetchAssignments = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/assignments`);
            const data = await response.json();
            setAssignments(data);
        } catch (error) {
            console.error("Failed to fetch assignments");
        }
    };

    return (
        <div className="min-h-screen p-8 relative overflow-hidden">
            <SnowEffect />
            <div className="frost-overlay" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white text-center mb-8 text-shadow-glow font-christmas">
                    🎅 Santa's Master List 📜
                </h1>

                {!isAuthenticated ? (
                    <Card className="max-w-md mx-auto glass-panel border-none">
                        <CardHeader>
                            <CardTitle className="text-center text-white flex items-center justify-center gap-2">
                                <Lock className="w-6 h-6" /> Restricted Access
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <Input
                                    type="password"
                                    placeholder="Enter Secret Code"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white/10 border-white/20 text-white"
                                />
                                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                                    <Unlock className="w-4 h-4 mr-2" /> Unlock
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="glass-panel border-none">
                        <CardContent className="p-6">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/20 hover:bg-white/5">
                                        <TableHead className="text-blue-200">Time</TableHead>
                                        <TableHead className="text-blue-200">Secret Santa (Giver)</TableHead>
                                        <TableHead className="text-blue-200">Target (Receiver)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assignments.map((assignment) => (
                                        <TableRow key={assignment._id} className="border-white/10 hover:bg-white/5">
                                            <TableCell className="text-white/80">
                                                {format(new Date(assignment.timestamp), "MMM d, h:mm a")}
                                            </TableCell>
                                            <TableCell className="font-medium text-green-400">
                                                {assignment.giverName} <span className="text-xs text-white/40">({assignment.giver})</span>
                                            </TableCell>
                                            <TableCell className="font-medium text-red-400">
                                                {assignment.receiverName} <span className="text-xs text-white/40">({assignment.receiver})</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {assignments.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center text-white/50 h-24">
                                                No assignments yet. The bag is empty!
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
