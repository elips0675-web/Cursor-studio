"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Heart, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles,
  ChevronLeft,
  Chrome,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ALL_DEMO_USERS } from "@/lib/demo-data";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("phone");

  useEffect(() => {
    if (localStorage.getItem('userProfile')) {
      router.push('/');
    }
  }, [router]);

  const simulateLogin = () => {
    // Сохраняем профиль по умолчанию для имитации авторизации
    const defaultUser = ALL_DEMO_USERS.find(u => u.name === "Анна") || ALL_DEMO_USERS[0];
    localStorage.setItem('userProfile', JSON.stringify(defaultUser));
    
    const defaultGallery = [
      defaultUser.img,
      "https://picsum.photos/seed/person_anna_gallery1/600/800",
      "https://picsum.photos/seed/person_anna_gallery2/600/800"
    ];
    localStorage.setItem('userProfileGallery', JSON.stringify(defaultGallery));

    toast({
      title: "С возвращением!",
      description: "Вы успешно вошли в SwiftMatch.",
    });
    // После входа направляем на главную страницу
    router.push("/");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Имитация входа
    setTimeout(() => {
      setIsLoading(false);
      simulateLogin();
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      simulateLogin();
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-svh bg-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-20%] w-[100%] h-[50%] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[100%] h-[50%] bg-[#ff8e53]/10 rounded-full blur-[120px] -z-10"></div>

      <header className="p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full h-10 w-10">
          <ChevronLeft size={24} />
        </Button>
      </header>

      <main className="flex-1 px-8 pt-4 pb-12 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-[2rem] gradient-bg text-white shadow-2xl shadow-primary/30 mb-6 animate-in zoom-in duration-500">
            <Heart size={40} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-black font-headline tracking-tighter mb-3">
            Swift<span className="gradient-text">Match</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">Твоя идеальная пара в одном клике</p>
        </div>

        <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex gap-2 p-1 bg-muted/30 rounded-2xl mb-2">
            <button 
              onClick={() => setLoginMethod("phone")}
              className={cn(
                "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                loginMethod === "phone" ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
              )}
            >
              Телефон
            </button>
            <button 
              onClick={() => setLoginMethod("email")}
              className={cn(
                "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                loginMethod === "email" ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
              )}
            >
              Email
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginMethod === "phone" ? (
              <div className="space-y-2">
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    type="tel" 
                    placeholder="+7 (999) 000-00-00" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 focus-visible:ring-primary/20 font-bold"
                    required
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input 
                      type="email" 
                      placeholder="Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 focus-visible:ring-primary/20 font-bold"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input 
                      type="password" 
                      placeholder="Пароль" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 focus-visible:ring-primary/20 font-bold"
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 rounded-full gradient-bg text-white font-black uppercase tracking-widest shadow-2xl shadow-primary/40 hover:scale-[1.02] transition-all active:scale-95 border-0"
            >
              {isLoading ? "Вход..." : "Продолжить"} <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-muted-foreground bg-white px-4">
              или
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={handleGoogleLogin}
            className="w-full h-14 rounded-full border-2 border-muted hover:bg-muted/30 transition-all font-bold gap-3 shadow-sm"
          >
            <Chrome size={20} className="text-[#4285F4]" />
            Войти через Google
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Нет аккаунта?{" "}
            <Link href="/login" className="text-primary font-black uppercase tracking-tighter hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>

        <div className="mt-auto pt-12 flex flex-col items-center gap-4">
          <Badge variant="secondary" className="bg-primary/5 text-primary border-0 px-4 py-2 rounded-xl flex gap-2 shadow-sm">
            <Sparkles size={14} /> <span>100% Приватно</span>
          </Badge>
        </div>
      </main>
    </div>
  );
}
