import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';

const Map = () => {
  const [mapMarkers] = useState([
    { id: 1, x: 25, y: 30, type: 'monument', name: 'Большой радар', icon: '📡' },
    { id: 2, x: 60, y: 20, type: 'monument', name: 'Электростанция', icon: '⚡' },
    { id: 3, x: 40, y: 60, type: 'monument', name: 'Склад', icon: '🏭' },
    { id: 4, x: 75, y: 70, type: 'base', name: 'База Player1', icon: '🏰' },
    { id: 5, x: 15, y: 80, type: 'base', name: 'База ProGamer', icon: '🏰' },
    { id: 6, x: 50, y: 45, type: 'event', name: 'PvP зона', icon: '⚔️' }
  ]);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">🗺️ Карта сервера</h1>
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
    </Layout>
  );
};

export default Map;
