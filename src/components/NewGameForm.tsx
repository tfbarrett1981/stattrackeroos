import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface NewGameFormProps {
  onGameCreated: (game: any) => void;
}

export const NewGameForm = ({ onGameCreated }: NewGameFormProps) => {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [location, setLocation] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGame = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      homeTeam,
      awayTeam,
      location,
      stats: {
        points: 0,
        blocks: 0,
        charges: 0
      }
    };

    onGameCreated(newGame);
    toast({
      title: "Game Created",
      description: `${homeTeam} vs ${awayTeam}`
    });

    setHomeTeam("");
    setAwayTeam("");
    setLocation("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md animate-scale-in">
      <h2 className="text-2xl font-bold text-primary mb-4">New Game</h2>
      <div className="space-y-2">
        <Input
          placeholder="Home Team"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          required
        />
        <Input
          placeholder="Away Team"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          required
        />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
        Create Game
      </Button>
    </form>
  );
};