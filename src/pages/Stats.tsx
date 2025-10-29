import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Layout from '@/components/Layout';

const Stats = () => {
  const [onlinePlayers, setOnlinePlayers] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlinePlayers(prev => prev + Math.floor(Math.random() * 3 - 1));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">📊 Статистика</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Топ игроков</h3>
                <Icon name="Trophy" size={20} className="text-secondary" />
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Player1', kills: 342, deaths: 89 },
                  { name: 'ProGamer', kills: 298, deaths: 102 },
                  { name: 'RustKing', kills: 276, deaths: 95 },
                  { name: 'Survivor', kills: 245, deaths: 78 }
                ].map((player, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {player.kills}K / {player.deaths}D
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Статус сервера</h3>
                <Badge className="bg-primary">Онлайн</Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Игроков онлайн</span>
                    <span className="font-semibold">{onlinePlayers}/200</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(onlinePlayers / 200) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">Аптайм</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">45ms</div>
                    <div className="text-sm text-muted-foreground">Пинг</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Stats;
