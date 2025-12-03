import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import SnowEffect from "@/components/SnowEffect";
import RouletteCylinder from "@/components/RouletteCylinder";
import AdminPanel from "@/components/AdminPanel";

// 🎅 CUSTOMIZE HERE - Add your office colleagues
const MASTER_LIST = [
  "Rishav",
  "Amit",
  "Sarah",
  "John",
  "Priya",
  "Rahul",
  "Sneha",
  "Vikram",
  "Anuja",
  "Raj",
  "Meera",
  "David",
  "Lisa",
  "Mike",
  "Jenny",
];

const ADMIN_PASSWORD = "santa2025"; // Change this!

const Index = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [userName, setUserName] = useState("");
  const [validatedName, setValidatedName] = useState("");
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Load assignments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("santa_assignments");
    if (saved) {
      setAssignments(JSON.parse(saved));
    }
  }, []);

  // Save assignments to localStorage
  const saveAssignment = useCallback(
    (giver: string, receiver: string) => {
      const updated = { ...assignments, [giver]: receiver };
      setAssignments(updated);
      localStorage.setItem("santa_assignments", JSON.stringify(updated));
    },
    [assignments]
  );

  const validateUser = () => {
    const name = userName.trim();
    if (!name) {
      toast({
        title: "⚠️ Please enter your name!",
        variant: "destructive",
      });
      return;
    }

    const validName = MASTER_LIST.find(
      (n) => n.toLowerCase() === name.toLowerCase()
    );
    if (!validName) {
      toast({
        title: "❌ Name not in guest list!",
        description: "Ask Admin to add you.",
        variant: "destructive",
      });
      return;
    }

    if (assignments[validName]) {
      toast({
        title: `🎁 ${validName}, you're already enrolled!`,
        description: `Contact admin to know who your Secret Santa target is.`,
      });
      return;
    }

    setValidatedName(validName);
    setStep(2);
  };

  const assignSecretSanta = (giver: string): string | null => {
    const takenTargets = new Set(Object.values(assignments));
    const available = MASTER_LIST.filter(
      (person) => person !== giver && !takenTargets.has(person)
    );
    return available.length
      ? available[Math.floor(Math.random() * available.length)]
      : null;
  };

  const spinWheel = () => {
    setIsSpinning(true);
    setShowResult(false);
    setResult(null);

    const rotations = 6 + Math.floor(Math.random() * 4);
    const degrees = rotations * 360 + Math.floor(Math.random() * 360);
    setRotation((prev) => prev + degrees);

    setTimeout(() => {
      const target = assignSecretSanta(validatedName);
      setIsSpinning(false);

      if (target) {
        saveAssignment(validatedName, target);
        setResult(target);
        setShowResult(true);
      } else {
        toast({
          title: "⚠️ No targets left!",
          description: "See Admin for reset.",
          variant: "destructive",
        });
      }
    }, 4000);
  };

  const resetUI = () => {
    setStep(1);
    setUserName("");
    setValidatedName("");
    setResult(null);
    setShowResult(false);
  };

  const clearAllData = () => {
    localStorage.removeItem("santa_assignments");
    setAssignments({});
    toast({
      title: "🗑️ All data cleared!",
      description: "Everyone can spin again.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-zinc-950 flex flex-col items-center justify-center overflow-hidden relative">
      <SnowEffect />

      <main className="relative z-10 text-center max-w-lg w-[90%] px-4 py-8">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-primary text-glow-primary mb-8 leading-tight">
          Secret Santa
          <br />
          <span className="text-foreground">Roulette</span>
        </h1>

        {step === 1 && (
          <div className="space-y-6 animate-reveal">
            <Input
              type="text"
              placeholder="Enter your name (e.g. Rishav)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && validateUser()}
              className="w-full max-w-xs mx-auto"
            />
            <Button variant="spin" size="lg" onClick={validateUser}>
              🎅 I'm Ready!
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-reveal">
            <div className="flex justify-center my-8">
              <RouletteCylinder rotation={rotation} isSpinning={isSpinning} />
            </div>

            <p className="text-lg text-muted-foreground">
              {!showResult
                ? `🎅 Hello ${validatedName}, spin to meet your Secret Santa target!`
                : ""}
            </p>

            {!showResult && (
              <Button
                variant="spin"
                size="lg"
                onClick={spinWheel}
                disabled={isSpinning}
              >
                {isSpinning ? "🎰 Spinning..." : "🎰 SPIN THE CYLINDER"}
              </Button>
            )}

            {showResult && result && (
              <div className="space-y-6">
                <div className="text-xl md:text-2xl font-bold animate-reveal">
                  <span className="text-foreground">🎯 You're Secret Santa for: </span>
                  <span className="text-secondary text-glow-secondary block mt-2 text-3xl">
                    {result}
                  </span>
                </div>
                <Button variant="next" size="lg" onClick={resetUI}>
                  👤 Next Person
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      <AdminPanel
        participants={MASTER_LIST}
        assignments={assignments}
        adminPassword={ADMIN_PASSWORD}
        onClearData={clearAllData}
      />
    </div>
  );
};

export default Index;
