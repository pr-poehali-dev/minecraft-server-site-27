import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const { toast } = useToast();
  const [onlinePlayers, setOnlinePlayers] = useState(127);
  const [timeToWipe, setTimeToWipe] = useState({ days: 3, hours: 12, minutes: 45, seconds: 30 });
  const [mapMarkers] = useState([
    { id: 1, x: 25, y: 30, type: 'monument', name: 'Большой радар', icon: '📡' },
    { id: 2, x: 60, y: 20, type: 'monument', name: 'Электростанция', icon: '⚡' },
    { id: 3, x: 40, y: 60, type: 'monument', name: 'Склад', icon: '🏭' },
    { id: 4, x: 75, y: 70, type: 'base', name: 'База Player1', icon: '🏰' },
    { id: 5, x: 15, y: 80, type: 'base', name: 'База ProGamer', icon: '🏰' },
    { id: 6, x: 50, y: 45, type: 'event', name: 'PvP зона', icon: '⚔️' }
  ]);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonateClick = async (packageName: string, amount: number) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/e1e13194-4a10-42a3-a5e6-85c04554c44a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package: packageName,
          amount: amount
        })
      });

      const data = await response.json();
      
      if (data.demo) {
        toast({
          title: '💳 Демо-режим',
          description: 'Платёжная система настроена! Добавь ключи ЮKassa для реальных платежей.',
        });
      } else if (data.payment_url) {
        window.open(data.payment_url, '_blank');
        toast({
          title: '✅ Платёж создан',
          description: 'Переходим на страницу оплаты...',
        });
      }
    } catch (error) {
      toast({
        title: '❌ Ошибка',
        description: 'Не удалось создать платёж. Попробуй позже.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlinePlayers(prev => prev + Math.floor(Math.random() * 3 - 1));
    }, 5000);

    const timer = setInterval(() => {
      setTimeToWipe(prev => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        return { days: newDays, hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-2xl">⛏️</div>
            <span className="text-xl font-bold">RustCraft</span>
          </div>
          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">Главная</button>
            <button onClick={() => scrollToSection('rules')} className="hover:text-primary transition-colors">Правила</button>
            <button onClick={() => scrollToSection('donate')} className="hover:text-primary transition-colors">Донат</button>
            <button onClick={() => scrollToSection('wipes')} className="hover:text-primary transition-colors">Вайплоги</button>
            <button onClick={() => scrollToSection('map')} className="hover:text-primary transition-colors">Карта</button>
            <button onClick={() => scrollToSection('stats')} className="hover:text-primary transition-colors">Статистика</button>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 animate-glow">
              <Icon name="Users" size={14} className="mr-1" />
              {onlinePlayers} онлайн
            </Badge>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-6 animate-fade-in bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            RustCraft Server
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up">
            Лучший Rust сервер с элементами Minecraft
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
            <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 animate-glow">
              <Icon name="Gamepad2" size={20} className="mr-2" />
              Играть сейчас
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Discord
            </Button>
          </div>

          <Card className="inline-block p-6 bg-card/50 backdrop-blur border-primary/20 animate-float">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 justify-center">
              <Icon name="Clock" size={20} className="text-secondary" />
              До вайпа осталось:
            </h3>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{timeToWipe.days}</div>
                <div className="text-sm text-muted-foreground">дней</div>
              </div>
              <div className="text-4xl font-bold">:</div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{timeToWipe.hours}</div>
                <div className="text-sm text-muted-foreground">часов</div>
              </div>
              <div className="text-4xl font-bold">:</div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{timeToWipe.minutes}</div>
                <div className="text-sm text-muted-foreground">минут</div>
              </div>
              <div className="text-4xl font-bold">:</div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{timeToWipe.seconds}</div>
                <div className="text-sm text-muted-foreground">секунд</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="rules" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">📜 Правила сервера</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '✅', title: 'Честная игра', desc: 'Запрещены читы, баги и эксплойты' },
              { icon: '🤝', title: 'Уважение', desc: 'Соблюдайте правила общения в чате' },
              { icon: '🏗️', title: 'Строительство', desc: 'Не блокируйте важные локации' },
              { icon: '⚔️', title: 'PvP', desc: 'Рейды разрешены, но без гриферства' },
              { icon: '🎤', title: 'Голосовой чат', desc: 'Не злоупотребляйте спамом и матом' },
              { icon: '💼', title: 'Торговля', desc: 'Разрешена честная торговля между игроками' }
            ].map((rule, i) => (
              <Card key={i} className="p-6 hover:border-primary/50 transition-all hover:scale-105 cursor-pointer">
                <div className="text-4xl mb-3">{rule.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{rule.title}</h3>
                <p className="text-muted-foreground">{rule.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="donate" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">💎 Донат привилегии</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Стартер',
                price: '299₽',
                color: 'border-gray-500',
                features: ['Приватный сундук', 'Телепорт домой', 'Цветной ник', '5 наборов в день']
              },
              {
                name: 'Премиум',
                price: '599₽',
                color: 'border-primary',
                features: ['Всё из Стартера', 'Приоритет в очереди', 'Больше слотов', '10 наборов', 'Свой скин']
              },
              {
                name: 'Легенда',
                price: '1299₽',
                color: 'border-secondary',
                features: ['Всё из Премиум', 'VIP статус', 'Уникальные команды', 'Безлимитные наборы', 'Эксклюзивные предметы']
              }
            ].map((pack, i) => {
              const amounts = [299, 599, 1299];
              const packageNames = ['starter', 'premium', 'legend'];
              
              return (
                <Card key={i} className={`p-6 ${pack.color} border-2 hover:scale-105 transition-all`}>
                  <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                  <div className="text-4xl font-black mb-4 text-primary">{pack.price}</div>
                  <ul className="space-y-2 mb-6">
                    {pack.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={i === 1 ? 'default' : 'outline'}
                    onClick={() => handleDonateClick(packageNames[i], amounts[i])}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Обработка...' : 'Купить'}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="wipes" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">🔄 Вайплоги</h2>
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

      <section id="map" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-8 text-center">🗺️ Карта сервера</h2>
          <Card className="p-6">
            <div className="relative w-full aspect-square max-w-3xl mx-auto bg-cover bg-center rounded-lg overflow-hidden" 
                 style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/ce820e75-153f-47a2-ba55-6f54bf2953f3/files/8a3fa760-ad99-4855-8f53-79005b9f9cab.jpg)' }}>
              <div className="absolute inset-0 bg-black/20">
                {mapMarkers.map((marker) => (
                  <div
                    key={marker.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                    onClick={() => setSelectedMarker(marker.id)}
                    onMouseEnter={() => setSelectedMarker(marker.id)}
                  >
                    <div className="relative">
                      <div className={`text-3xl transition-all duration-300 ${selectedMarker === marker.id ? 'scale-150 animate-float' : 'scale-100'}`}>
                        {marker.icon}
                      </div>
                      {selectedMarker === marker.id && (
                        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-background/95 border border-primary rounded-lg px-3 py-2 whitespace-nowrap animate-fade-in z-10">
                          <div className="text-sm font-semibold">{marker.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">{marker.type}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📡</span>
                <span className="text-sm text-muted-foreground">Монументы</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏰</span>
                <span className="text-sm text-muted-foreground">Базы игроков</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚔️</span>
                <span className="text-sm text-muted-foreground">PvP зоны</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="stats" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">📊 Статистика</h2>
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

      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-2xl">⛏️</div>
            <span className="text-xl font-bold">RustCraft</span>
          </div>
          <p className="text-muted-foreground mb-4">Лучший Rust сервер с элементами Minecraft</p>
          <div className="flex gap-4 justify-center">
            <Button variant="ghost" size="sm">
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Youtube" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Twitter" size={20} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-8">© 2024 RustCraft. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;