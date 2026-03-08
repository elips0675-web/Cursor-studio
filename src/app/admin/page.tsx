
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Users, UserCheck, UserPlus, Heart, BookOpen, ChevronRight, TrendingUp, BarChart3 } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('admin.total_users')}</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">10,234</div>
            <p className="text-[10px] text-muted-foreground font-bold mt-1">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('admin.online_users')}</CardTitle>
            <UserCheck className="h-4 w-4 text-[#2ecc71]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">1,257</div>
            <p className="text-[10px] text-muted-foreground font-bold mt-1">Currently active</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('admin.new_users')}</CardTitle>
            <UserPlus className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">+128</div>
            <p className="text-[10px] text-muted-foreground font-bold mt-1">+15% since yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('admin.total_matches')}</CardTitle>
            <Heart className="h-4 w-4 text-primary" fill="currentColor" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">23,489</div>
            <p className="text-[10px] text-muted-foreground font-bold mt-1">+19.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-sm bg-slate-900 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
            <BarChart3 size={120} />
          </div>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-[#2ecc71] text-white border-0">Live</Badge>
              <CardTitle className="text-lg font-black uppercase tracking-tight">Growth Analytics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 text-sm mb-6 max-w-xs font-medium">
              Отслеживайте динамику регистраций и вовлеченности пользователей в реальном времени.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-[#2ecc71]">84%</div>
                <div className="text-[8px] uppercase font-black text-slate-500">Retention</div>
              </div>
              <div className="w-px h-8 bg-slate-800"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#2ecc71]">12.4m</div>
                <div className="text-[8px] uppercase font-black text-slate-500">Session Avg</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl">
              <Link href="/admin/analytics">
                Посмотреть отчеты <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-0 shadow-sm bg-primary/5 border-primary/10 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-black uppercase tracking-tight">
              <BookOpen className="h-5 w-5 text-primary" />
              {t('admin.docs.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {t('admin.docs.desc')}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="p-3 bg-white rounded-xl shadow-sm space-y-1">
                <h6 className="font-bold text-[10px] uppercase text-primary">Runbook</h6>
                <p className="text-[9px] text-muted-foreground">Инструкция по быстрому запуску копии проекта.</p>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm space-y-1">
                <h6 className="font-bold text-[10px] uppercase text-primary">A/B Testing</h6>
                <p className="text-[9px] text-muted-foreground">Как проводить эксперименты через Remote Config.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full rounded-xl gradient-bg text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20 border-0">
              <Link href="/admin/docs">
                {language === 'RU' ? 'Открыть документацию' : 'Open Documentation'} <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
