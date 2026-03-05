
"use client";

import { useState } from "react";
import { 
  Heart, 
  Eye, 
  UserPlus, 
  ChevronRight, 
  Sparkles, 
  Play, 
  Check, 
  Zap, 
  ShieldCheck,
  Star,
  Info
} from "lucide-react";
import Image from "next/image";
import { AppHeader } from "@/components/layout/app-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/language-context";

const ACTIVITY_DATA = [
  { id: 1, user: 'Анна', age: 24, img: PlaceHolderImages[0].imageUrl, type: 'like', time: '5 мин назад', seen: false, blurred: true },
  { id: 2, user: 'Елена', age: 26, img: PlaceHolderImages[2].imageUrl, type: 'visit', time: '15 мин назад', seen: false, blurred: false },
  { id: 3, user: 'Мария', age: 29, img: PlaceHolderImages[6].imageUrl, type: 'match', time: '1 час назад', seen: true, blurred: false },
  { id: 4, user: 'София', age: 22, img: PlaceHolderImages[4].imageUrl, type: 'like', time: '3 часа назад', seen: true, blurred: true },
  { id: 5, user: 'Ксения', age: 23, img: PlaceHolderImages[8].imageUrl, type: 'visit', time: '5 часов назад', seen: true, blurred: false },
];

const PREMIUM_PLANS = [
  { id: '1m', name: '1 месяц', price: '499 ₽', oldPrice: '', discount: '', popular: false },
  { id: '6m', name: '6 месяцев', price: '1 990 ₽', oldPrice: '2 994 ₽', discount: '-33%', popular: true },
  { id: '12m', name: '12 месяцев', price: '2 990 ₽', oldPrice: '5 988 ₽', discount: '-50%', popular: false },
];

export default function ActivityPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [showPremium, setShowPremium] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('6m');

  const handleWatchAd = () => {
    setIsAdLoading(true);
    setTimeout(() => {
      setIsAdLoading(false);
      setShowAd(false);
      toast({
        title: "Профиль открыт!",
        description: "Вы получили 1 бесплатный просмотр лайка за рекламу.",
      });
    }, 3000);
  };

  const filteredActivity = ACTIVITY_DATA.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "likes") return item.type === "like" || item.type === "match";
    if (activeTab === "visits") return item.type === "visit";
    return true;
  });

  return (
    <>
      <AppHeader />
      <main className="flex-1 overflow-y-auto px-5 pt-6 pb-24 bg-[#f8f9fb]">
        <div className="flex justify-between items-end mb-8 px-1">
          <div>
            <h2 className="text-3xl font-black font-headline tracking-tighter text-foreground">
              {activeTab === 'all' ? 'События' : activeTab === 'likes' ? 'Лайки' : 'Визиты'}
            </h2>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1.5 opacity-60">
              Ваша активность сегодня
            </p>
          </div>
          <Badge className="gradient-bg text-white rounded-full px-3 py-1 border-0 shadow-lg shadow-primary/20 font-black text-[10px]">
            5 новых
          </Badge>
        </div>

        <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-md h-14 p-1.5 gap-2 rounded-3xl border border-white shadow-sm">
            <TabsTrigger 
              value="all" 
              className="rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted-foreground data-[state=active]:gradient-bg data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 border-0"
            >
              Все
            </TabsTrigger>
            <TabsTrigger 
              value="likes" 
              className="rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted-foreground data-[state=active]:gradient-bg data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 border-0"
            >
              Лайки
            </TabsTrigger>
            <TabsTrigger 
              value="visits" 
              className="rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted-foreground data-[state=active]:gradient-bg data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 border-0"
            >
              Визиты
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-8 space-y-5 outline-none">
            {/* Ad Banner Action */}
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAd(true)}
              className="w-full h-16 rounded-[1.75rem] border-2 border-dashed border-primary/20 text-primary font-black text-[11px] uppercase tracking-[0.15em] gap-3 bg-primary/5 hover:bg-primary/10 transition-all flex items-center justify-center shadow-sm group"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Play size={14} className="ml-0.5 fill-primary text-primary" />
              </div>
              Разблокировать анкету бесплатно
            </motion.button>

            {/* List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredActivity.length > 0 ? (
                  filteredActivity.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={item.id}
                    >
                      <ActivityItem item={item} onUnlock={() => setShowAd(true)} />
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-24 opacity-30 flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                      <Info size={32} />
                    </div>
                    <p className="text-sm font-black uppercase tracking-widest">Ничего не найдено</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>

        {/* Premium Banner */}
        <motion.div 
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowPremium(true)}
          className="gradient-bg rounded-[2.5rem] p-8 text-white mb-12 relative overflow-hidden app-shadow cursor-pointer group transition-all"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
            <Sparkles size={140} />
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/20">
                <Star size={20} className="text-yellow-300" fill="currentColor" />
              </div>
              <h4 className="font-black text-2xl tracking-tighter">Premium Доступ</h4>
            </div>
            <p className="text-sm text-white/90 mb-8 max-w-[260px] leading-relaxed font-medium">
              Узнайте, кому вы понравились, и получите безлимитные лайки прямо сейчас!
            </p>
            <div className="inline-flex items-center gap-3 bg-white text-primary text-[10px] font-black uppercase tracking-[0.2em] py-4 px-10 rounded-full shadow-2xl hover:bg-orange-50 transition-colors">
              Подключить <ChevronRight size={14} strokeWidth={4} />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Premium Tariffs Dialog */}
      <Dialog open={showPremium} onOpenChange={setShowPremium}>
        <DialogContent className="max-w-[380px] rounded-[3rem] p-0 overflow-hidden border-0 bg-white app-shadow">
          <div className="relative h-48 gradient-bg flex flex-col items-center justify-center text-white p-6 overflow-hidden">
             <div className="absolute inset-0 bg-black/5"></div>
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute opacity-10"
             >
                <Sparkles size={200} />
             </motion.div>
             <Star className="text-yellow-300 mb-3 drop-shadow-lg relative z-10" size={56} fill="currentColor" />
             <DialogTitle className="text-3xl font-black uppercase tracking-tighter relative z-10">Premium</DialogTitle>
             <p className="text-[10px] text-white/80 font-bold uppercase tracking-[0.3em] relative z-10 mt-2">Выберите идеальный план</p>
          </div>

          <div className="p-8 space-y-4">
            {PREMIUM_PLANS.map((plan) => (
              <div 
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  "relative p-5 rounded-[1.75rem] border-2 transition-all cursor-pointer flex justify-between items-center group",
                  selectedPlan === plan.id 
                    ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                    : "border-muted hover:border-muted-foreground/20"
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-6 bg-primary text-white text-[8px] uppercase font-black border-2 border-white shadow-sm px-3 py-1">Best Choice</Badge>
                )}
                {plan.discount && (
                  <Badge className="absolute -top-3 right-6 bg-[#2ecc71] text-white text-[8px] uppercase font-black border-2 border-white shadow-sm px-3 py-1">{plan.discount}</Badge>
                )}
                
                <div>
                  <h6 className="font-bold text-sm text-foreground/80 group-hover:text-foreground">{plan.name}</h6>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-black text-foreground">{plan.price}</span>
                    {plan.oldPrice && <span className="text-[10px] text-muted-foreground line-through decoration-primary/40 opacity-60">{plan.oldPrice}</span>}
                  </div>
                </div>

                <div className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all",
                  selectedPlan === plan.id ? "border-primary bg-primary text-white scale-110 shadow-lg shadow-primary/20" : "border-muted"
                )}>
                  {selectedPlan === plan.id && <Check size={20} strokeWidth={4} />}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-6 border-t border-muted mt-2">
               <div className="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest">
                 <Zap size={14} className="text-primary" /> Безлимит
               </div>
               <div className="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest">
                 <Eye size={14} className="text-primary" /> Просмотры
               </div>
               <div className="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest">
                 <ShieldCheck size={14} className="text-primary" /> Инкогнито
               </div>
               <div className="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest">
                 <Sparkles size={14} className="text-primary" /> Супер-лайки
               </div>
            </div>
          </div>

          <DialogFooter className="p-8 pt-0">
            <Button className="w-full h-16 rounded-full gradient-bg text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 active:scale-95 transition-all text-[11px] border-0">
              Начать сейчас
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Watch Ad Dialog */}
      <Dialog open={showAd} onOpenChange={setShowAd}>
        <DialogContent className="max-w-[340px] rounded-[3rem] p-10 text-center bg-white app-shadow border-0">
          <div className="w-28 h-28 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-[2rem] bg-primary/5 animate-ping"></div>
            <Play size={44} className="text-primary ml-1.5 relative z-10" fill="currentColor" />
          </div>
          <DialogTitle className="text-2xl font-black mb-3 font-headline tracking-tighter uppercase">Бонус-просмотр</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mb-10 leading-relaxed font-medium">
            Посмотрите короткое видео, чтобы открыть анкету на <span className="text-primary font-bold">24 часа</span> абсолютно бесплатно.
          </DialogDescription>
          
          <div className="flex flex-col gap-4">
            <Button 
              onClick={handleWatchAd}
              disabled={isAdLoading}
              className="w-full h-16 rounded-full gradient-bg text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 text-[11px] border-0"
            >
              {isAdLoading ? "Загрузка..." : "Смотреть рекламу"}
            </Button>
            <Button variant="ghost" onClick={() => setShowAd(false)} className="rounded-full text-muted-foreground text-[10px] font-black uppercase tracking-widest h-12">
              Не сейчас
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </>
  );
}

function ActivityItem({ item, onUnlock }: { item: any, onUnlock: () => void }) {
  const getIcon = () => {
    switch (item.type) {
      case 'like': return <Heart size={14} className="text-white" fill="currentColor" />;
      case 'visit': return <Eye size={14} className="text-white" />;
      case 'match': return <UserPlus size={14} className="text-white" />;
      default: return null;
    }
  };

  const getBgColor = () => {
    switch (item.type) {
      case 'like': return 'gradient-bg';
      case 'visit': return 'bg-blue-500';
      case 'match': return 'bg-green-500';
      default: return 'bg-muted';
    }
  };

  const getMessage = () => {
    switch (item.type) {
      case 'like': return 'поставила вам лайк';
      case 'visit': return 'посетила ваш профиль';
      case 'match': return 'новое совпадение с вами!';
      default: return '';
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-5 p-5 rounded-[2.5rem] transition-all cursor-pointer group relative overflow-hidden",
      item.seen ? "bg-white/40 opacity-70" : "bg-white app-shadow hover:translate-y-[-4px] border border-white"
    )}>
      {!item.seen && (
        <div className="absolute top-0 left-0 w-2 h-full gradient-bg opacity-40"></div>
      )}
      
      <div className="relative flex-shrink-0">
        <div className={cn(
          "w-18 h-18 sm:w-20 sm:h-20 rounded-[2.25rem] overflow-hidden relative border-4 border-white shadow-xl transition-all duration-500",
          item.blurred && "blur-[14px] grayscale opacity-60 scale-95"
        )}>
          <Image src={item.img} alt={item.user} fill className="object-cover" />
          {item.blurred && (
             <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                <Sparkles className="text-white/40" size={24} />
             </div>
          )}
        </div>
        <div className={cn(
          "absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-3 border-white shadow-xl z-20",
          getBgColor()
        )}>
          {getIcon()}
        </div>
      </div>
      
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[14px] leading-tight text-foreground/90 font-medium">
            {item.blurred ? (
              <span><span className="font-black text-primary">Кто-то</span> {getMessage()}</span>
            ) : (
              <>
                <span className="font-black text-foreground">{item.user}, {item.age}</span> {getMessage()}
              </>
            )}
          </p>
          {!item.seen && (
            <div className="relative flex h-2.5 w-2.5 mt-1 ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </div>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground font-black tracking-widest uppercase opacity-40">{item.time}</p>
        
        {item.blurred && (
          <button 
            onClick={(e) => { e.stopPropagation(); onUnlock(); }}
            className="text-[9px] font-black text-primary flex items-center gap-2 mt-3 bg-primary/5 px-5 py-2.5 rounded-full w-fit hover:bg-primary/10 transition-all uppercase tracking-[0.15em] shadow-sm border border-primary/10"
          >
            <Sparkles size={12} className="animate-pulse" /> Раскрыть профиль
          </button>
        )}
      </div>

      <ChevronRight size={20} className="text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1.5 transition-all flex-shrink-0" strokeWidth={3} />
    </div>
  );
}

