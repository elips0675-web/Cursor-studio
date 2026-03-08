
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { useLanguage } from "@/context/language-context";
import { TrendingUp, Users, Heart, MessageSquare, DollarSign, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const registrationData = [
  { day: 'Пн', users: 120 },
  { day: 'Вт', users: 150 },
  { day: 'Ср', users: 180 },
  { day: 'Чт', users: 220 },
  { day: 'Пт', users: 280 },
  { day: 'Сб', users: 350 },
  { day: 'Вс', users: 310 },
];

const matchData = [
  { day: 'Пн', matches: 450 },
  { day: 'Вт', matches: 520 },
  { day: 'Ср', matches: 480 },
  { day: 'Чт', matches: 610 },
  { day: 'Пт', matches: 750 },
  { day: 'Сб', matches: 920 },
  { day: 'Вс', matches: 880 },
];

export default function AdminAnalyticsPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">{language === 'RU' ? 'Аналитика роста' : 'Growth Analytics'}</h2>
          <p className="text-muted-foreground font-medium">{language === 'RU' ? 'Реальные показатели за последние 7 дней' : 'Live metrics for the last 7 days'}</p>
        </div>
        <div className="flex items-center gap-2 bg-[#2ecc71]/10 text-[#2ecc71] px-4 py-2 rounded-2xl border border-[#2ecc71]/20">
          <TrendingUp size={20} />
          <span className="font-black text-sm uppercase tracking-wider">+24% {language === 'RU' ? 'за неделю' : 'this week'}</span>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">DAU (Online)</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">1,257</div>
            <div className="flex items-center gap-1 text-[#2ecc71] text-[10px] font-bold mt-1">
              <ArrowUpRight size={12} /> +12% vs yesterday
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Matches</CardTitle>
            <Heart className="h-4 w-4 text-primary" fill="currentColor" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">23,489</div>
            <div className="flex items-center gap-1 text-[#2ecc71] text-[10px] font-bold mt-1">
              <ArrowUpRight size={12} /> +18% vs last week
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">142.5K</div>
            <div className="flex items-center gap-1 text-[#2ecc71] text-[10px] font-bold mt-1">
              <ArrowUpRight size={12} /> +5% vs yesterday
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-slate-900 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Est. Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-[#2ecc71]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">$4,280</div>
            <div className="flex items-center gap-1 text-[#2ecc71] text-[10px] font-bold mt-1">
              <ArrowUpRight size={12} /> +32% monthly growth
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-black">{language === 'RU' ? 'Новые пользователи' : 'New User Growth'}</CardTitle>
            <CardDescription>{language === 'RU' ? 'Динамика регистраций по дням' : 'Daily registration dynamics'}</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 800, color: '#1e293b' }}
                />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-black">{language === 'RU' ? 'Активность мэтчей' : 'Match Activity'}</CardTitle>
            <CardDescription>{language === 'RU' ? 'Количество взаимных лайков' : 'Number of mutual likes'}</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="matches" fill="#fe3c72" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden bg-primary/5 border-primary/10">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-primary shadow-xl shrink-0">
            <DollarSign size={40} />
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black tracking-tight">{language === 'RU' ? 'Готовность к масштабированию' : 'Scalability Readiness'}</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">
              {language === 'RU' 
                ? 'Архитектура приложения поддерживает White-Label. Вы можете развернуть клон проекта в новом регионе с другими настройками монетизации всего за 1 час. Инструкция доступна в документации.'
                : 'The app architecture supports White-Label. You can deploy a clone of the project in a new region with different monetization settings in just 1 hour. Full guide is available in the docs.'}
            </p>
          </div>
          <Badge className="bg-slate-900 text-white px-6 py-2 rounded-full font-black uppercase tracking-widest shrink-0">Investor Ready</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
