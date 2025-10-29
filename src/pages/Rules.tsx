import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';

const Rules = () => {
  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">📜 Правила сервера</h1>
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
    </Layout>
  );
};

export default Rules;
