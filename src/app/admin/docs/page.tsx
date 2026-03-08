'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, Cpu, Layers, Sparkles, Zap, ShieldCheck, Target, Users, ShieldAlert, 
  MessageSquare, Settings2, Rocket, TestTube, CheckCircle2, Trophy, Camera, 
  Flame, Mail, DollarSign, Heart, Gift, Info, Video, Flag, SlidersHorizontal
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function AdminDocsPage() {
  const { t, language } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-24">
      <header className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight flex items-center gap-4">
          <BookOpen className="text-primary" size={40} />
          {t('admin.docs.title')}
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          Полное техническое и функциональное описание платформы SwiftMatch для администраторов и разработчиков. Узнайте, как работают алгоритмы и как управлять системой.
        </p>
      </header>

      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 h-auto p-1.5 bg-muted/50 rounded-xl mb-10">
          <TabsTrigger value="architecture" className="rounded-lg py-3 font-black text-sm uppercase tracking-wider">Архитектура</TabsTrigger>
          <TabsTrigger value="features" className="rounded-lg py-3 font-black text-sm uppercase tracking-wider">Функционал</TabsTrigger>
          <TabsTrigger value="logic" className="rounded-lg py-3 font-black text-sm uppercase tracking-wider">Алгоритмы</TabsTrigger>
          <TabsTrigger value="admin" className="rounded-lg py-3 font-black text-sm uppercase tracking-wider">Управление</TabsTrigger>
          <TabsTrigger value="security" className="hidden lg:flex rounded-lg py-3 font-black text-sm uppercase tracking-wider">Безопасность</TabsTrigger>
        </TabsList>

        {/* ARCHITECTURE TAB */}
        <TabsContent value="architecture">
          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-8 md:grid-cols-2">
            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full">
                <CardHeader className="bg-primary/5 rounded-t-xl pb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Cpu size={28} />
                  </div>
                  <CardTitle className="text-2xl font-black">{t('admin.docs.about_title')}</CardTitle>
                  <CardDescription className="text-base">Технологический стек проекта</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Frontend (Next.js 15)</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                      Использование <b>React 19</b> и <b>Server Components</b> позволяет минимизировать объем JavaScript на клиенте, обеспечивая мгновенную загрузку даже на слабых устройствах. Оптимизация LCP через приоритетную загрузку фото.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Backend & DB (Firebase)</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                      <b>Firestore</b> обеспечивает синхронизацию данных в реальном времени (Real-time чаты, уведомления). <b>Firebase Auth</b> управляет безопасным входом через Google и Email.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">AI Engine (Genkit)</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                      Все интеллектуальные функции реализованы через <b>Google Genkit</b> с использованием моделей Gemini 2.5 Flash. Архитектура готова к подключению <b>DeepSeek</b>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full">
                <CardHeader className="bg-purple-500/5 rounded-t-xl pb-8">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-4">
                    <Rocket size={28} />
                  </div>
                  <CardTitle className="text-2xl font-black">CI/CD и Тесты</CardTitle>
                  <CardDescription className="text-base">Автоматизация разработки</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="mt-1 p-2 rounded-lg bg-purple-50">
                        <TestTube className="text-purple-500" size={20} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-black">Unit-тестирование (Jest)</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">Покрывает критическую бизнес-логику: расчет званий, фильтры сообщений и вспомогательные функции.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 p-2 rounded-lg bg-purple-50">
                        <ShieldCheck className="text-purple-500" size={20} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-black">GitHub Actions</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">Автоматическая проверка кода (Lint, Typecheck, Test) при каждом Push в репозиторий.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 p-2 rounded-lg bg-purple-50">
                        <Zap className="text-purple-500" size={20} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-black">Firebase App Hosting</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">Автоматический деплой стабильных версий в облачную инфраструктуру Google Cloud.</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* FEATURES TAB */}
        <TabsContent value="features">
          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-600 mb-3">
                    <Heart size={24} />
                  </div>
                  <CardTitle className="text-xl font-black">Чаты и AI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground font-medium">
                  <p>• <b>Real-time:</b> Мгновенная доставка сообщений через Firestore Listeners.</p>
                  <p>• <b>AI Icebreakers:</b> Генерация персонализированных фраз для начала диалога на основе 6 разных настроений.</p>
                  <p>• <b>Индикация:</b> Статусы "в сети", "печатает", подтверждение прочтения (синие галочки).</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-3">
                    <Users size={24} />
                  </div>
                  <CardTitle className="text-xl font-black">Группы (Сообщества)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground font-medium">
                  <p>• <b>20+ категорий:</b> Музыка, Спорт, IT, Путешествия и другие тематические хабы.</p>
                  <p>• <b>Групповые чаты:</b> Массовое общение участников одной категории.</p>
                  <p>• <b>Anti-Spam:</b> Cooldown система (5 секунд) для поддержания чистоты общения в больших чатах.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-3">
                    <Trophy size={24} />
                  </div>
                  <CardTitle className="text-xl font-black">Фотоконкурс</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground font-medium">
                  <p>• <b>Голосование:</b> Ежемесячное голосование пользователей за лучшие анкеты.</p>
                  <p>• <b>Пьедестал:</b> Визуальное выделение топ-3 участников с анимациями и коронами.</p>
                  <p>• <b>Квесты:</b> Задание "Проголосуй за 5 человек" для получения бонусов.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                    <Flame size={24} />
                  </div>
                  <CardTitle className="text-xl font-black">Квесты и Звания</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground font-medium">
                  <p>• <b>Daily Quests:</b> Обновляемый список задач для повышения вовлеченности (Retention).</p>
                  <p>• <b>Титулы:</b> Автоматическое присвоение званий ("Король свиданий", "Душа компании") на основе активности.</p>
                  <p>• <b>Rewards:</b> Календарь наград за ежедневный вход в приложение.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-3">
                    <Sparkles size={24} />
                  </div>
                  <CardTitle className="text-xl font-black">AI Возможности</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground font-medium">
                  <p>• <b>AI Bio:</b> Генерация креативного описания профиля по интересам пользователя.</p>
                  <p>• <b>Match Insight:</b> Анализ совместимости пары при мэтче с выделением точек соприкосновения.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600 mb-3">
                    <Video size={24} />
                  </div>
                  <CardTitle className="text-xl font-black">Видеозвонки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground font-medium">
                  <p>• <b>WebRTC Ready:</b> Полноценный интерфейс видеозвонка с управлением камерой и микрофоном.</p>
                  <p>• <b>Интерфейс:</b> Поддержка полноэкранного режима и плавающего окна (Picture-in-Picture).</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* LOGIC TAB */}
        <TabsContent value="logic">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            <Card className="border-0 shadow-md overflow-hidden">
              <CardHeader className="bg-orange-500/5 border-b border-orange-500/10 pb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                    <Target size={28} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black">{t('admin.docs.logic_title')}</CardTitle>
                    <CardDescription className="text-base font-medium">Многоуровневый алгоритм ранжирования анкет</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-10 space-y-10">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="space-y-4 p-6 rounded-3xl bg-muted/30 border border-border/50 relative">
                    <Badge className="absolute -top-3 left-6 bg-orange-500 text-white border-0 font-black px-3 py-1">Этап 1</Badge>
                    <h5 className="font-black text-sm uppercase tracking-widest text-primary pt-2">Жесткий фильтр</h5>
                    <ul className="text-sm space-y-3 text-muted-foreground font-medium">
                      <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[#2ecc71]"/> Пол и ориентация</li>
                      <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[#2ecc71]"/> Возраст (+/- 5 лет)</li>
                      <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[#2ecc71]"/> Город / Геолокация</li>
                    </ul>
                  </div>

                  <div className="space-y-4 p-6 rounded-3xl bg-white border-2 border-orange-500/20 shadow-2xl shadow-orange-500/5 relative">
                    <Badge className="absolute -top-3 left-6 bg-orange-500 text-white border-0 font-black px-3 py-1">Этап 2</Badge>
                    <h5 className="font-black text-sm uppercase tracking-widest text-primary pt-2">Умный скоринг</h5>
                    <div className="space-y-3 py-2">
                      <div className="flex justify-between items-center text-sm font-black">
                        <span>Совпадение цели</span>
                        <span className="text-orange-600">+1000 pts</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-black">
                        <span>Общий интерес</span>
                        <span className="text-orange-600">+100 pts / шт</span>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground font-bold italic pt-2">
                      Алгоритм суммирует очки и ранжирует список. Те, кто больше всего подходит, оказываются в самом верху выдачи.
                    </p>
                  </div>

                  <div className="space-y-4 p-6 rounded-3xl bg-muted/30 border border-border/50 relative">
                    <Badge className="absolute -top-3 left-6 bg-orange-500 text-white border-0 font-black px-3 py-1">Этап 3</Badge>
                    <h5 className="font-black text-sm uppercase tracking-widest text-primary pt-2">Правило пересечения</h5>
                    <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                      В выдачу попадают только те, у кого есть <b>хотя бы одно</b> совпадение (по цели ИЛИ интересам). Это гарантирует, что в ленте нет "случайных" людей.
                    </p>
                    <div className="flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-tighter mt-4">
                      <Sparkles size={16} /> Чистая лента без шума
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ADMIN TAB */}
        <TabsContent value="admin">
          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-8 md:grid-cols-2">
            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full">
                <CardHeader className="bg-slate-900 text-white rounded-t-xl pb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                    <Settings2 size={28} />
                  </div>
                  <CardTitle className="text-2xl font-black">Панель управления</CardTitle>
                  <CardDescription className="text-slate-400 text-base">Инструменты модератора</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  <div className="grid gap-6">
                    <div className="flex gap-4">
                      <div className="mt-1 p-2.5 rounded-xl bg-slate-100"><Users size={20} /></div>
                      <div>
                        <p className="text-base font-black">Управление пользователями</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">Просмотр, редактирование персональных данных, блокировка нарушителей и удаление аккаунтов.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 p-2.5 rounded-xl bg-slate-100"><SlidersHorizontal size={20} /></div>
                      <div>
                        <p className="text-base font-black">Feature Flags</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">Включение и выключение функций (видеозвонки, ИИ-инсайты) в реальном времени без необходимости деплоя нового кода.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 p-2.5 rounded-xl bg-slate-100"><DollarSign size={20} /></div>
                      <div>
                        <p className="text-base font-black">Монетизация</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">Настройка ID рекламных блоков для Google AdMob и Yandex Ads для управления доходностью.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full">
                <CardHeader className="bg-blue-600 text-white rounded-t-xl pb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                    <Mail size={28} />
                  </div>
                  <CardTitle className="text-2xl font-black">Коммуникации</CardTitle>
                  <CardDescription className="text-blue-100 text-base">Рассылки и контент</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  <div className="grid gap-6">
                    <div className="flex gap-4">
                      <div className="mt-1 p-2.5 rounded-xl bg-blue-50"><MessageSquare size={20} className="text-blue-600" /></div>
                      <div>
                        <p className="text-base font-black">Массовые рассылки</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">Отправка системных уведомлений (In-App) или Email-кампаний по всей базе или сегментам (Premium, Новые).</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 p-2.5 rounded-xl bg-blue-50"><Layers size={20} className="text-blue-600" /></div>
                      <div>
                        <p className="text-base font-black">Управление контентом</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">Редактирование глобальных справочников: обновляйте списки интересов, целей и уровней образования.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* SECURITY TAB */}
        <TabsContent value="security">
          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-8 md:grid-cols-2">
            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full">
                <CardHeader className="bg-green-500/5 rounded-t-xl pb-8">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 mb-4">
                    <ShieldAlert size={28} />
                  </div>
                  <CardTitle className="text-2xl font-black">Безопасность контента</CardTitle>
                  <CardDescription className="text-base">Автоматическая фильтрация</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  <div className="space-y-4">
                    <h5 className="text-base font-black flex items-center gap-3"><CheckCircle2 size={20} className="text-green-500" /> Фильтр сообщений (Антимат)</h5>
                    <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                      Система в реальном времени анализирует текст всех сообщений. Если обнаружено нарушение, отправка блокируется с уведомлением пользователя.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline" className="text-[10px] font-black uppercase py-1 px-3">Нецензурная лексика</Badge>
                      <Badge variant="outline" className="text-[10px] font-black uppercase py-1 px-3">Спам / Ссылки</Badge>
                      <Badge variant="outline" className="text-[10px] font-black uppercase py-1 px-3">Политика</Badge>
                      <Badge variant="outline" className="text-[10px] font-black uppercase py-1 px-3">Оскорбления</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-0 shadow-md h-full">
                <CardHeader className="bg-red-500/5 rounded-t-xl pb-8">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600 mb-4">
                    <Flag size={28} />
                  </div>
                  <CardTitle className="text-2xl font-black">Система жалоб</CardTitle>
                  <CardDescription className="text-base">Модерация по обращениям</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                    Каждый пользователь имеет возможность подать анонимную жалобу на анкету или чат. Жалобы мгновенно поступают в раздел <b>«Жалобы»</b> админки для принятия мер.
                  </p>
                  <ul className="text-sm space-y-2 text-muted-foreground font-bold list-disc pl-5 pt-2">
                    <li>История взаимодействий reporter/reported</li>
                    <li>Конкретная причина (Фейк, Спам, Агрессия)</li>
                    <li>Автоматическое логирование даты события</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <footer className="text-center pt-16 border-t mt-10">
        <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground/30">
          SwiftMatch Platform Documentation • Version 1.0.0 • 2024
        </p>
      </footer>
    </div>
  );
}
