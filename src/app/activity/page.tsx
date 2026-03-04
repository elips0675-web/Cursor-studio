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
  Star
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
  const [activeTab, setActiveTab] = useState("all");
  const [showPremium, setShowPremium] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('6m');

  const handleWatchAd = () => {
    setIsAdLoading(true);
    // Симуляция просмотра рекламы 3 секунды
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
      <main className="flex-1 overflow-y-auto px-5 pt-6 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-headline">Активность</h2>
          <Badge className="bg-primary text-white rounded-full">5 новых</Badge>
        </div>

        <Tabs defaultValue="all" className="w-full mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-muted rounded-2xl h-11 p-1">
            <TabsTrigger value="all" className="rounded-xl text-xs font-bold data-[state=active]:gradient-bg data-[state=active]:text-white">Все</TabsTrigger>
            <TabsTrigger value="likes" className="rounded-xl text-xs font-bold data-[state=active]:gradient-bg data-[state=active]:text-white">Лайки</TabsTrigger>
            <TabsTrigger value="visits" className="rounded-xl text-xs font-bold data-[state=active]:gradient-bg data-[state=active]:text-white">Просмотры</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Premium Banner */}
        <div 
          onClick={() => setShowPremium(true)}
          className="gradient-bg rounded-[2rem] p-5 text-white mb-8 relative overflow-hidden shadow-lg shadow-primary/20 cursor-pointer group active:scale-[0.98] transition-all"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
            <Sparkles size={60} />
          </div>
          <div className="relative z-10">
            <h4 className="font-bold text-base mb-1">Узнай, кто тебя лайкнул</h4>
            <p className="text-[10px] text-white/80 mb-4 uppercase tracking-wider font-bold">SwiftMatch Premium</p>
            <button className="bg-white text-primary text-[10px] font-bold py-2 px-6 rounded-full shadow-sm">
              Попробовать сейчас
            </button>
          </div>
        </div>

        {/* Ad Button */}
        <div className="mb-6">
           <Button 
            variant="outline" 
            onClick={() => setShowAd(true)}
            className="w-full h-12 rounded-2xl border-dashed border-primary/40 text-primary font-bold gap-2 hover:bg-primary/5 transition-colors"
           >
             <Play size={16} fill="currentColor" /> Посмотреть рекламу за просмотр лайка
           </Button>
        </div>

        <div className="space-y-4">
          {filteredActivity.map((item) => (
            <ActivityItem key={item.id} item={item} onUnlock={() => setShowAd(true)} />
          ))}
        </div>
      </main>

      {/* Premium Tariffs Dialog */}
      <Dialog open={showPremium} onOpenChange={setShowPremium}>
        <DialogContent className="max-w-[380px] rounded-[2.5rem] p-0 overflow-hidden border-0 bg-white shadow-2xl">
          <div className="relative h-32 gradient-bg flex flex-col items-center justify-center text-white p-6">
             <Star className="text-yellow-300 mb-1 animate-pulse" size={32} fill="currentColor" />
             <DialogTitle className="text-xl font-black uppercase tracking-tight">SwiftMatch Premium</DialogTitle>
             <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Выберите ваш тариф</p>
          </div>

          <div className="p-6 space-y-4">
            {PREMIUM_PLANS.map((plan) => (
              <div 
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  "relative p-4 rounded-3xl border-2 transition-all cursor-pointer flex justify-between items-center",
                  selectedPlan === plan.id 
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-muted hover:border-muted-foreground/20"
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2.5 left-4 bg-primary text-white text-[8px] uppercase font-black border-2 border-white">Популярно</Badge>
                )}
                {plan.discount && (
                  <Badge className="absolute -top-2.5 right-4 bg-[#2ecc71] text-white text-[8px] uppercase font-black border-2 border-white">{plan.discount}</Badge>
                )}
                
                <div>
                  <h6 className="font-bold text-sm">{plan.name}</h6>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-foreground">{plan.price}</span>
                    {plan.oldPrice && <span className="text-[10px] text-muted-foreground line-through">{plan.oldPrice}</span>}
                  </div>
                </div>

                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  selectedPlan === plan.id ? "border-primary bg-primary text-white" : "border-muted"
                )}>
                  {selectedPlan === plan.id && <Check size={14} strokeWidth={3} />}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3 pt-2">
               <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase">
                 <Zap size={12} className="text-primary" /> Безлимит лайков
               </div>
               <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase">
                 <Eye size={12} className="text-primary" /> Кто меня лайкнул
               </div>
               <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase">
                 <ShieldCheck size={12} className="text-primary" /> Режим инкогнито
               </div>
               <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase">
                 <Sparkles size={12} className="text-primary" /> 5 Супер-лайков
               </div>
            </div>
          </div>

          <DialogFooter className="p-6 pt-0">
            <Button className="w-full h-14 rounded-full gradient-bg text-white font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all">
              Подключить за {PREMIUM_PLANS.find(p => p.id === selectedPlan)?.price}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Watch Ad Dialog */}
      <Dialog open={showAd} onOpenChange={setShowAd}>
        <DialogContent className="max-w-[340px] rounded-[2.5rem] p-8 text-center bg-white shadow-2xl">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Play size={32} className="text-primary ml-1" fill="currentColor" />
          </div>
          <DialogTitle className="text-xl font-bold mb-2">Бесплатный просмотр</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mb-6">
            Посмотрите короткое видео (15-30 сек), чтобы открыть этого пользователя на 24 часа.
          </DialogDescription>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleWatchAd}
              disabled={isAdLoading}
              className="w-full h-12 rounded-full gradient-bg text-white font-bold"
            >
              {isAdLoading ? "Смотрим видео..." : "Смотреть рекламу"}
            </Button>
            <Button variant="ghost" onClick={() => setShowAd(false)} className="rounded-full text-muted-foreground text-xs">
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
      case 'like': return 'bg-primary';
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
      "flex items-center gap-4 p-4 rounded-3xl transition-all cursor-pointer group",
      item.seen ? "bg-white/50 grayscale-[0.3]" : "bg-white app-shadow"
    )}>
      <div className="relative flex-shrink-0">
        <div className={cn(
          "w-14 h-14 rounded-full overflow-hidden relative border-2 border-white shadow-sm",
          item.blurred && "blur-md"
        )}>
          <Image src={item.img} alt={item.user} fill className="object-cover" />
        </div>
        <div className={cn(
          "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm",
          getBgColor()
        )}>
          {getIcon()}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-0.5">
          <p className="text-xs leading-snug">
            {item.blurred ? (
              <span className="font-bold text-foreground">Кто-то {getMessage()}</span>
            ) : (
              <>
                <span className="font-bold text-foreground">{item.user}, {item.age}</span> {getMessage()}
              </>
            )}
          </p>
          {!item.seen && <span className="w-2 h-2 bg-primary rounded-full mt-1.5 animate-pulse"></span>}
        </div>
        <p className="text-[10px] text-muted-foreground">{item.time}</p>
        
        {item.blurred && (
          <button 
            onClick={(e) => { e.stopPropagation(); onUnlock(); }}
            className="text-[9px] font-bold text-primary flex items-center gap-1 mt-1 hover:underline"
          >
            <Sparkles size={10} /> Узнать кто
          </button>
        )}
      </div>

      <ChevronRight size={18} className="text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
    </div>
  );
}
