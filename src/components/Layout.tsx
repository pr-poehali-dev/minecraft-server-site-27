import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-2xl">⛏️</div>
            <span className="text-xl font-bold">RustCraft</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <Link to="/rules" className="hover:text-primary transition-colors">Правила</Link>
            <Link to="/donate" className="hover:text-primary transition-colors">Донат</Link>
            <Link to="/wipes" className="hover:text-primary transition-colors">Вайплоги</Link>
            <Link to="/map" className="hover:text-primary transition-colors">Карта</Link>
            <Link to="/stats" className="hover:text-primary transition-colors">Статистика</Link>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 animate-glow">
              <Icon name="Users" size={14} className="mr-1" />
              {onlinePlayers} онлайн
            </Badge>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {children}
      </main>

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

export default Layout;
