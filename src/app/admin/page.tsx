
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Users, UserCheck, UserPlus, Heart, BookOpen, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

      <Card className="border-0 shadow-sm bg-primary/5 border-primary/10">
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
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="p-3 bg-white rounded-xl shadow-sm space-y-1">
              <h6 className="font-bold text-xs">{t('admin.docs.about_title')}</h6>
              <p className="text-[10px] text-muted-foreground">{language === 'RU' ? 'Стек: Next.js + Firebase' : 'Stack: Next.js + Firebase'}</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm space-y-1">
              <h6 className="font-bold text-xs">{t('admin.docs.features_title')}</h6>
              <p className="text-[10px] text-muted-foreground">{language === 'RU' ? 'AI, Чаты, Видеозвонки' : 'AI, Chats, Video Calls'}</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm space-y-1">
              <h6 className="font-bold text-xs">{t('admin.docs.logic_title')}</h6>
              <p className="text-[10px] text-muted-foreground">{language === 'RU' ? 'Умный алгоритм скоринга' : 'Smart scoring algorithm'}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full sm:w-auto rounded-full gradient-bg text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20">
            <Link href="/admin/docs">
              {language === 'RU' ? 'Открыть документацию' : 'Open Documentation'} <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
