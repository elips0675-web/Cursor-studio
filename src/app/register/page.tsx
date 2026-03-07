"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Heart, 
  Mail, 
  Lock, 
  ArrowRight, 
  User,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuth } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({
        title: "Ошибка",
        description: "Пароль должен быть не менее 6 символов.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });
      
      toast({
        title: "Успех!",
        description: `Аккаунт для ${name} создан. Теперь заполните свой профиль.`,
      });
      
      // Redirect to onboarding to create the user profile
      router.push('/onboarding');

    } catch (error: any) {
      console.error("Registration Error:", error);
      let errorMessage = "Не удалось создать аккаунт.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Этот email уже используется.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Неверный формат email.";
      }
      toast({
        title: "Ошибка регистрации",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-svh bg-white relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-20%] w-[100%] h-[50%] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[100%] h-[50%] bg-[#ff8e53]/10 rounded-full blur-[120px] -z-10"></div>

      <header className="p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full h-10 w-10">
          <ChevronLeft size={24} />
        </Button>
      </header>
      
      <main className="flex-1 px-8 pt-4 pb-12 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-[2rem] gradient-bg text-white shadow-2xl shadow-primary/30 mb-6">
            <Heart size={40} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-black font-headline tracking-tighter mb-3">
            Регистрация
          </h1>
          <p className="text-muted-foreground text-sm font-medium">Создайте аккаунт, чтобы начать</p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleRegister} className="space-y-4">
             <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                type="text" 
                placeholder="Имя" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 focus-visible:ring-primary/20 font-bold"
                required
              />
            </div>
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
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                type="password" 
                placeholder="Пароль (мин. 6 символов)" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 focus-visible:ring-primary/20 font-bold"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 rounded-full gradient-bg text-white font-black uppercase tracking-widest shadow-2xl shadow-primary/40 hover:scale-[1.02] transition-all active:scale-95 border-0"
            >
              {isLoading ? "Создание..." : "Создать аккаунт"} <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-primary font-black uppercase tracking-tighter hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
