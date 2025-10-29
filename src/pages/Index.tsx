import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Layout from '@/components/Layout';

const Index = () => {
  return (
    <Layout>
      <section className="pt-12 pb-20 px-4">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center hover:scale-105 transition-all">
              <div className="text-5xl mb-3">⚔️</div>
              <div className="text-3xl font-bold text-primary mb-1">127</div>
              <div className="text-sm text-muted-foreground">Игроков онлайн</div>
            </Card>
            <Card className="p-6 text-center hover:scale-105 transition-all">
              <div className="text-5xl mb-3">🏆</div>
              <div className="text-3xl font-bold text-primary mb-1">200</div>
              <div className="text-sm text-muted-foreground">Максимум</div>
            </Card>
            <Card className="p-6 text-center hover:scale-105 transition-all">
              <div className="text-5xl mb-3">🗺️</div>
              <div className="text-3xl font-bold text-primary mb-1">4000</div>
              <div className="text-sm text-muted-foreground">Размер карты</div>
            </Card>
            <Card className="p-6 text-center hover:scale-105 transition-all">
              <div className="text-5xl mb-3">⚡</div>
              <div className="text-3xl font-bold text-primary mb-1">45ms</div>
              <div className="text-sm text-muted-foreground">Пинг</div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
