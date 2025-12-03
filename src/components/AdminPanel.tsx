import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Settings, Trash2, Lock, X } from "lucide-react";

interface AdminPanelProps {
  participants: string[];
  assignments: Record<string, string>;
  adminPassword: string;
  onClearData: () => void;
}

const AdminPanel = ({
  participants,
  assignments,
  adminPassword,
  onClearData,
}: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("🚫 ACCESS DENIED");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsAuthenticated(false);
    setPassword("");
    setError("");
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to reset all assignments?")) {
      onClearData();
      handleClose();
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground box-glow-primary z-50 p-0"
        title="Admin Panel"
      >
        <Settings className="w-6 h-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary text-glow-primary flex items-center gap-2">
              🎅 Admin Control Panel
            </DialogTitle>
          </DialogHeader>

          {!isAuthenticated ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Lock className="w-12 h-12 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                className="max-w-xs glass-effect border-border focus:border-primary"
              />
              {error && <p className="text-destructive">{error}</p>}
              <div className="flex gap-3">
                <Button
                  onClick={handleAuth}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Unlock
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="border-muted-foreground"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary hover:bg-primary">
                      <TableHead className="text-primary-foreground font-bold">
                        Santa (Giver)
                      </TableHead>
                      <TableHead className="text-primary-foreground font-bold">
                        🎁 Target (Receiver)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((person) => (
                      <TableRow
                        key={person}
                        className="border-border hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">{person}</TableCell>
                        <TableCell
                          className={
                            assignments[person]
                              ? "text-secondary"
                              : "text-muted-foreground"
                          }
                        >
                          {assignments[person] || "⏳ Pending..."}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleClear}
                  variant="destructive"
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  RESET ALL DATA
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="gap-2 border-muted-foreground"
                >
                  <X className="w-4 h-4" />
                  Close Panel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPanel;
