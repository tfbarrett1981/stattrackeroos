import { useEffect, useState } from "react";
import { createDb, GameDocument } from "@/lib/db";
import { NewGameForm } from "@/components/NewGameForm";
import { StatsTracker } from "@/components/StatsTracker";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [db, setDb] = useState<any>(null);
  const [currentGame, setCurrentGame] = useState<GameDocument | null>(null);
  const [games, setGames] = useState<GameDocument[]>([]);

  useEffect(() => {
    const initDb = async () => {
      const database = await createDb();
      setDb(database);
      
      const allGames = await database.games.find().exec();
      setGames(allGames.map(g => g.toJSON()));
    };
    
    initDb();
  }, []);

  const handleGameCreated = async (game: GameDocument) => {
    if (db) {
      await db.games.insert(game);
      setGames([...games, game]);
      setCurrentGame(game);
    }
  };

  const handleUpdateStats = async (newStats: GameDocument['stats']) => {
    if (db && currentGame) {
      const updatedGame = { ...currentGame, stats: newStats };
      await db.games.upsert(updatedGame);
      setCurrentGame(updatedGame);
      setGames(games.map(g => g.id === updatedGame.id ? updatedGame : g));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Basketball Stats Tracker
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <NewGameForm onGameCreated={handleGameCreated} />
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Game History</h2>
              <div className="space-y-4">
                {games.map((game) => (
                  <Card 
                    key={game.id}
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setCurrentGame(game)}
                  >
                    <h3 className="font-semibold">
                      {game.homeTeam} vs {game.awayTeam}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(game.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">{game.location}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div>
            {currentGame && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  {currentGame.homeTeam} vs {currentGame.awayTeam}
                </h2>
                <StatsTracker 
                  game={currentGame}
                  onUpdateStats={handleUpdateStats}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;