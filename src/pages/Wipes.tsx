import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Layout from '@/components/Layout';

const Wipes = () => {
  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">🔄 Вайплоги</h1>
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Текущий вайп</TabsTrigger>
              <TabsTrigger value="history">История</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Вайп 15.10.2024</h3>
                  <Badge className="bg-primary">Активен</Badge>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>🗺️ Новая карта: размер 4000</p>
                  <p>🏆 Максимум игроков: 200</p>
                  <p>⚙️ Обновления: добавлены новые монументы</p>
                  <p>🎁 Бонусы: стартовые наборы для всех игроков</p>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
              {[
                { date: '08.10.2024', map: 3500, players: 180 },
                { date: '01.10.2024', map: 4000, players: 195 },
                { date: '24.09.2024', map: 3500, players: 165 }
              ].map((wipe, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{wipe.date}</div>
                      <div className="text-sm text-muted-foreground">Карта: {wipe.map} | Игроки: {wipe.players}</div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Wipes;
