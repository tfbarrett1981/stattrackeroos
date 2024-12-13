import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { GameDocument } from "@/lib/db";

interface StatsTrackerProps {
  game: GameDocument;
  onUpdateStats: (stats: GameDocument['stats']) => void;
}

export const StatsTracker = ({ game, onUpdateStats }: StatsTrackerProps) => {
  const updateStat = (stat: keyof GameDocument['stats'], increment: boolean) => {
    const newStats = {
      ...game.stats,
      [stat]: increment ? game.stats[stat] + 1 : Math.max(0, game.stats[stat] - 1)
    };
    onUpdateStats(newStats);
  };

  const StatButton = ({ stat, value }: { stat: keyof GameDocument['stats']; value: number }) => (
    <Card className="p-4 text-center animate-scale-in">
      <h3 className="text-lg font-semibold mb-2 capitalize">{stat}</h3>
      <div className="text-3xl font-bold mb-4 text-primary">{value}</div>
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateStat(stat, false)}
          className="h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateStat(stat, true)}
          className="h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <StatButton stat="points" value={game.stats.points} />
      <StatButton stat="blocks" value={game.stats.blocks} />
      <StatButton stat="charges" value={game.stats.charges} />
    </div>
  );
};