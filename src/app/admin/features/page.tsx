
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { doc, setDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FeatureFlags } from '@/context/feature-flags-context';
import { toast } from '@/hooks/use-toast';
import { Loader2, Save, RotateCcw } from 'lucide-react';

const FEATURE_METADATA: { key: keyof FeatureFlags; label: string; description: string }[] = [
  {
    key: 'videoCallsEnabled',
    label: 'Видеозвонки',
    description: 'Разрешить видеозвонки между пользователями в чатах.',
  },
  {
    key: 'aiIcebreakersEnabled',
    label: 'AI Icebreakers в чате',
    description: 'Предлагать пользователям фразы для начала диалога, сгенерированные AI.',
  },
  {
    key: 'aiCompatibilityEnabled',
    label: 'AI Анализ совместимости',
    description: 'Показывать анализ совместимости при создании нового мэтча.',
  },
  {
    key: 'groupsPageEnabled',
    label: 'Страница Групп',
    description: 'Включить или отключить раздел "Группы" в приложении.',
  },
];

export default function FeatureFlagsPage() {
  const firestore = useFirestore();
  const [flags, setFlags] = useState<Partial<FeatureFlags>>({});
  const [pendingFlags, setPendingFlags] = useState<Partial<FeatureFlags>>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const featureFlagsRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, 'config', 'features');
  }, [firestore]);

  useEffect(() => {
    if (!featureFlagsRef) return;
    
    setLoading(true);
    const unsubscribe: Unsubscribe = onSnapshot(featureFlagsRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data() as FeatureFlags;
        setFlags(data);
        setPendingFlags(data);
      } else {
        const defaults = {
            videoCallsEnabled: true,
            aiIcebreakersEnabled: true,
            aiCompatibilityEnabled: true,
            groupsPageEnabled: true
        };
        setFlags(defaults);
        setPendingFlags(defaults);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching feature flags:", error);
      toast({ variant: 'destructive', title: 'Ошибка загрузки', description: 'Не удалось загрузить настройки функций.' });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [featureFlagsRef]);

  const handleFlagToggle = useCallback((key: keyof FeatureFlags, value: boolean) => {
    setPendingFlags(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = () => {
    setPendingFlags(flags);
    toast({ title: 'Изменения сброшены' });
  };

  const handleSave = async () => {
    if (!featureFlagsRef) return;

    setIsSaving(true);
    try {
      await setDoc(featureFlagsRef, pendingFlags, { merge: true });
      toast({ 
        title: 'Настройки сохранены', 
        description: 'Новые правила управления функциями вступили в силу для всех пользователей.' 
      });
    } catch (error) {
      console.error("Error updating feature flags:", error);
      toast({ variant: 'destructive', title: 'Ошибка сохранения', description: 'Не удалось обновить настройки.' });
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = useMemo(() => {
    return JSON.stringify(flags) !== JSON.stringify(pendingFlags);
  }, [flags, pendingFlags]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-black uppercase tracking-tight">Управление функциями</CardTitle>
          <CardDescription>Включайте или отключайте функции приложения в реальном времени.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {FEATURE_METADATA.map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between space-x-4 p-4 rounded-2xl border bg-background hover:bg-muted/5 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor={key} className="text-sm font-bold cursor-pointer">{label}</Label>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <Switch
                id={key}
                checked={pendingFlags[key] ?? true}
                onCheckedChange={(value) => handleFlagToggle(key, value)}
              />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-3 border-t bg-muted/5 px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={handleReset} 
            disabled={!hasChanges || isSaving}
            className="rounded-full text-[10px] font-black uppercase tracking-widest h-10 px-6"
          >
            <RotateCcw className="mr-2 h-3 w-3" />
            Сбросить
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges || isSaving}
            className="min-w-[140px] rounded-full gradient-bg text-white font-black uppercase tracking-widest h-10 px-8 shadow-lg shadow-primary/20 border-0"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Save className="mr-2 h-3 w-3" />
                Сохранить
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {hasChanges && (
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center justify-center animate-in fade-in slide-in-from-top-2">
          <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">У вас есть несохраненные изменения</p>
        </div>
      )}
    </div>
  );
}
