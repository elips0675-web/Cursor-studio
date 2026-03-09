'use client';

import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { ALL_DEMO_USERS } from "@/lib/demo-data";
import Image from "next/image";
import { Cpu, Sparkles } from "lucide-react";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";

const HeartConfetti = dynamic(() => import("@/components/animations/heart-confetti").then(mod => mod.HeartConfetti), { ssr: false });

export function MatchDialog({
  open,
  onOpenChange,
  matchUser,
  compatibility,
  loadingAi,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matchUser: any;
  compatibility: string;
  loadingAi: boolean;
}) {
  const { t, language } = useLanguage();
  const router = useRouter();

  if (!matchUser) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] rounded-3xl border-0 p-0 overflow-hidden bg-white app-shadow">
        <div className="relative">
          {open && <HeartConfetti />}
          <div className="relative h-56 flex items-center justify-center p-6 gradient-bg">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="flex items-center justify-center gap-0 relative">
              <motion.div initial={{ x: -60, opacity: 0, rotate: -15, scale: 0.8 }} animate={{ x: 0, opacity: 1, rotate: -8, scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.2 }} className="w-36 h-36 rounded-3xl border-4 border-white shadow-2xl overflow-hidden relative z-10 -mr-8 bg-muted">
                <Image src={ALL_DEMO_USERS[1].img} alt="Вы" fill sizes="144px" className="object-cover" />
              </motion.div>
              <motion.div initial={{ x: 60, opacity: 0, rotate: 15, scale: 0.8 }} animate={{ x: 0, opacity: 1, rotate: 8, scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.3 }} className="w-36 h-36 rounded-3xl border-4 border-white shadow-2xl overflow-hidden relative z-0 bg-muted">
                <Image src={matchUser?.img || ALL_DEMO_USERS[0].img} alt={matchUser?.name || "Matched user photo"} fill sizes="144px" className="object-cover" />
              </motion.div>
            </div>
          </div>
          <div className="px-8 pt-8 pb-8 text-center">
            <DialogTitle className="text-3xl font-black font-headline mb-3 gradient-text uppercase tracking-tight">{t('match.title')}</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm mb-8 px-6 leading-relaxed font-medium">
              {language === 'RU' ? 'Вы с ' : 'You and '} <span className="font-bold text-foreground">{matchUser?.name}</span> {language === 'RU' ? 'понравились друг другу.' : 'liked each other.'}
            </DialogDescription>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative p-6 rounded-[2.5rem] mb-8 text-left border border-orange-500/20 bg-gradient-to-br from-white via-orange-500/[0.02] to-orange-500/[0.05] shadow-xl shadow-orange-500/5 overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                    <Cpu size={14} className="animate-pulse" />
                  </div>
                  <h4 className="text-[11px] font-black text-orange-500 uppercase tracking-[0.2em]">{t('match.insight')}</h4>
                </div>
                <Sparkles size={20} className="text-orange-400 opacity-60" />
              </div>
              {loadingAi ? (
                <div className="flex items-center gap-3 text-xs text-muted-foreground py-2 relative z-10">
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="animate-pulse font-bold uppercase tracking-widest text-[10px]">{t('home.searching')}</span>
                </div>
              ) : (
                <div className="relative z-10">
                  <p className="text-[13px] leading-relaxed text-foreground/90 font-semibold italic border-l-4 border-orange-500/30 pl-4 py-1">"{compatibility}"</p>
                </div>
              )}
            </motion.div>
            <div className="flex flex-col gap-4 w-full">
              <Button onClick={() => matchUser?.id && router.push(`/chats?matchId=${matchUser.id}`)} className="w-full h-16 rounded-full gradient-bg text-white font-black app-shadow hover:scale-[1.02] active:scale-95 transition-all border-0 uppercase tracking-[0.2em] text-[11px] shadow-primary/30">
                {t('button.write_first')}
              </Button>
              <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full rounded-full h-12 text-muted-foreground font-black hover:bg-muted transition-all uppercase tracking-[0.1em] text-[10px]">
                {t('button.continue')}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
