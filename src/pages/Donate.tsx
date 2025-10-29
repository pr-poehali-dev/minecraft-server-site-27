import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import Layout from '@/components/Layout';

const Donate = () => {
  const { toast } = useToast();
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

  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">💎 Донат привилегии</h1>
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
    </Layout>
  );
};

export default Donate;
