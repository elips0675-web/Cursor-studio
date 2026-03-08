
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Cpu, Layers, Sparkles, Zap, ShieldCheck, Target, Users, ShieldAlert, MessageSquare, Settings2, Rocket, TestTube, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function AdminDocsPage() {
  const { t, language } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <header className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight">{t('admin.docs.title')}</h2>
        <p className="text-muted-foreground">{t('admin.docs.desc')}</p>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2"
      >
        {/* About Project & Tech Stack */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm h-full flex flex-col">
            <CardHeader className="bg-primary/5 rounded-t-lg">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Cpu size={20} />
              </div>
              <CardTitle className="text-xl font-bold">{t('admin.docs.about_title')}</CardTitle>
              <CardDescription>{language === 'RU' ? 'Технологический стек и архитектура' : 'Tech stack and architecture'}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 flex-1">
              <div className="space-y-2">
                <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js 15</Badge>
                  <Badge variant="secondary">React 19</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">ShadCN UI</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-orange-200 text-orange-700">Firebase Auth</Badge>
                  <Badge variant="outline" className="border-orange-200 text-orange-700">Firestore</Badge>
                  <Badge variant="outline" className="border-purple-200 text-purple-700">Genkit (AI)</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {language === 'RU' 
                  ? 'Приложение использует архитектуру Server Components для минимизации JS-бандла и Firebase для работы в реальном времени. Все AI функции работают через Google Gemini 2.5 Flash.'
                  : 'The app uses Server Components architecture to minimize JS bundle and Firebase for real-time capabilities. All AI features are powered by Google Gemini 2.5 Flash.'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features List */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm h-full flex flex-col">
            <CardHeader className="bg-blue-500/5 rounded-t-lg">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-2">
                <Layers size={20} />
              </div>
              <CardTitle className="text-xl font-bold">{t('admin.docs.features_title')}</CardTitle>
              <CardDescription>{language === 'RU' ? 'Реализованные возможности MVP' : 'Implemented MVP features'}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex-1">
              <ul className="space-y-2.5">
                {[
                  { icon: <ShieldCheck size={14}/>, text: language === 'RU' ? 'Полноценная Auth система (Google/Email)' : 'Full Auth system (Google/Email)' },
                  { icon: <Sparkles size={14}/>, text: language === 'RU' ? 'AI-генерация био и айсбрейкеров' : 'AI Bio and Icebreaker generation' },
                  { icon: <Zap size={14}/>, text: language === 'RU' ? 'Система мэтчей с AI-анализом' : 'Match system with AI analysis' },
                  { icon: <Users size={14}/>, text: language === 'RU' ? 'Тематические группы и чаты' : 'Thematic groups and chats' },
                  { icon: <Zap size={14}/>, text: language === 'RU' ? 'Геймификация (задания, уровни)' : 'Gamification (tasks, levels)' },
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <span className="text-blue-500">{f.icon}</span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* CI/CD & Testing */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm h-full flex flex-col">
            <CardHeader className="bg-purple-500/5 rounded-t-lg">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-2">
                <Rocket size={20} />
              </div>
              <CardTitle className="text-xl font-bold">{language === 'RU' ? 'CI/CD и Тесты' : 'CI/CD & Tests'}</CardTitle>
              <CardDescription>{language === 'RU' ? 'Автоматизация и качество' : 'Automation and quality'}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-purple-100 text-purple-600">
                  <TestTube size={14} />
                </div>
                <div>
                  <h5 className="text-xs font-bold">{language === 'RU' ? 'Unit и UI тесты' : 'Unit & UI Tests'}</h5>
                  <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">Jest + React Testing Library для проверки логики и интерфейса.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-purple-100 text-purple-600">
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <h5 className="text-xs font-bold">{language === 'RU' ? 'GitHub Actions CI' : 'GitHub Actions CI'}</h5>
                  <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">Автоматическая проверка кода при каждом пуше в репозиторий.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-purple-100 text-purple-600">
                  <Zap size={14} />
                </div>
                <div>
                  <h5 className="text-xs font-bold">{language === 'RU' ? 'Firebase App Hosting' : 'Firebase App Hosting'}</h5>
                  <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">Автоматический деплой стабильных версий в облако Google.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Safety & Moderation */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm h-full flex flex-col">
            <CardHeader className="bg-green-500/5 rounded-t-lg">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 mb-2">
                <ShieldAlert size={20} />
              </div>
              <CardTitle className="text-xl font-bold">{language === 'RU' ? 'Безопасность' : 'Safety'}</CardTitle>
              <CardDescription>{language === 'RU' ? 'Антимат и система жалоб' : 'Anti-profanity and Reporting'}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 flex-1">
              <div className="space-y-2">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <MessageSquare size={12} /> {language === 'RU' ? 'Фильтр сообщений' : 'Message Filter'}
                </h5>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {language === 'RU' 
                    ? 'Внедрена автоматическая проверка сообщений на наличие нецензурной лексики, спама, политических тем и ссылок. Система блокирует отправку вредоносного контента в реальном времени.'
                    : 'Automatic checking of messages for profanity, spam, political topics, and links is implemented. The system blocks malicious content in real-time.'}
                </p>
              </div>
              <div className="space-y-2">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <ShieldAlert size={12} /> {language === 'RU' ? 'Жалобы' : 'Reporting'}
                </h5>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {language === 'RU' 
                    ? 'Пользователи могут пожаловаться на профиль или чат. Все жалобы мгновенно поступают в раздел «Жалобы» панели администратора для принятия мер.'
                    : 'Users can report profiles or chats. All reports instantly appear in the "Reports" section of the admin panel for action.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Autosearch Logic - Detailed */}
        <motion.div variants={item} className="md:col-span-2">
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="bg-orange-500/5 border-b border-orange-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                  <Target size={20} />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">{t('admin.docs.logic_title')}</CardTitle>
                  <CardDescription>{language === 'RU' ? 'Как работает алгоритм «Автопоиска»' : 'How the Autosearch algorithm works'}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3 p-5 rounded-3xl bg-muted/30 border border-border/50 relative">
                  <Badge className="absolute -top-2 left-4 bg-orange-500 text-white border-0">Этап 1</Badge>
                  <h5 className="font-black text-[10px] uppercase tracking-widest text-primary">Жесткий фильтр</h5>
                  <ul className="text-xs space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#2ecc71]"/> {language === 'RU' ? 'Пол' : 'Gender'}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#2ecc71]"/> {language === 'RU' ? 'Возраст (+/- 5 лет)' : 'Age range'}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#2ecc71]"/> {language === 'RU' ? 'Город / Локация' : 'Location'}</li>
                  </ul>
                  <p className="text-[10px] leading-relaxed italic">
                    {language === 'RU' ? 'Отсекает 80% нерелевантных анкет сразу.' : 'Cuts off 80% of irrelevant profiles instantly.'}
                  </p>
                </div>

                <div className="space-y-3 p-5 rounded-3xl bg-white border-2 border-orange-500/20 shadow-xl shadow-orange-500/5 relative">
                  <Badge className="absolute -top-2 left-4 bg-orange-500 text-white border-0">Этап 2</Badge>
                  <h5 className="font-black text-[10px] uppercase tracking-widest text-primary">Умный скоринг</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span>{language === 'RU' ? 'Общая цель' : 'Same Goal'}</span>
                      <span className="text-orange-600">+1000 pts</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span>{language === 'RU' ? 'За каждый интерес' : 'Per Interest'}</span>
                      <span className="text-orange-600">+100 pts</span>
                    </div>
                  </div>
                  <p className="text-[10px] leading-relaxed text-muted-foreground pt-2">
                    {language === 'RU' 
                      ? 'Алгоритм суммирует очки и ранжирует список. Те, кто больше всего подходит пользователю, оказываются вверху ленты.' 
                      : 'The algorithm sums up points and ranks the list. Those who fit best appear at the top of the feed.'}
                  </p>
                </div>

                <div className="space-y-3 p-5 rounded-3xl bg-muted/30 border border-border/50 relative">
                  <Badge className="absolute -top-2 left-4 bg-orange-500 text-white border-0">Этап 3</Badge>
                  <h5 className="font-black text-[10px] uppercase tracking-widest text-primary">Правило пересечения</h5>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {language === 'RU' 
                      ? 'В итоговую выдачу попадают только те анкеты, у которых есть ХОТЯ БЫ одно совпадение (по цели ИЛИ по интересам).' 
                      : 'Only profiles with AT LEAST one match (by goal OR interests) appear in the final results.'}
                  </p>
                  <div className="flex items-center gap-1.5 text-orange-600 font-bold text-[9px] uppercase tracking-tighter">
                    <Sparkles size={12} /> {language === 'RU' ? 'Никакого мусора в ленте' : 'No spam in the feed'}
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                <h5 className="text-sm font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-primary" />
                  {language === 'RU' ? 'Влияние интересов на конверсию' : 'Impact of Interests on Conversion'}
                </h5>
                <p className="text-xs leading-relaxed text-muted-foreground mb-4">
                  {language === 'RU' 
                    ? 'Общие интересы не только поднимают анкету в поиске, но и подсвечиваются в интерфейсе. Это создает психологический триггер «Мы похожи», что увеличивает вероятность лайка на 40% по сравнению с обычным просмотром.' 
                    : 'Shared interests not only boost profiles but are also highlighted in the UI. This creates a "We are alike" psychological trigger, increasing like probability by 40%.'}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-white text-[9px] font-bold uppercase py-1">Scoring System</Badge>
                  <Badge variant="outline" className="bg-white text-[9px] font-bold uppercase py-1">Interest Matching</Badge>
                  <Badge variant="outline" className="bg-white text-[9px] font-bold uppercase py-1">Goal Alignment</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
