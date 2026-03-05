'use client';

import { useState, useEffect, useMemo } from 'react';
import { doc, setDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FeatureFlags } from '@/context/feature-flags-context';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const featureMetadata: { key: keyof FeatureFlags; label: string; description: string }[] = [
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
  const [loading, setLoading] = useState(true);
  
  const featureFlagsRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, 'config', 'features');
  }, [firestore]);

  useEffect(() => {
    if (!featureFlagsRef) return;
    
    setLoading(true);
    const unsubscribe: Unsubscribe = onSnapshot(featureFlagsRef, (doc) => {
      if (doc.exists()) {
        setFlags(doc.data() as FeatureFlags);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching feature flags:", error);
      toast({ variant: 'destructive', title: 'Ошибка загрузки', description: 'Не удалось загрузить настройки функций.' });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [featureFlagsRef]);

  const handleFlagChange = async (key: keyof FeatureFlags, value: boolean) => {
    if (!featureFlagsRef) return;

    const newFlags = { ...flags, [key]: value };
    setFlags(newFlags); // Optimistic update

    try {
      await setDoc(featureFlagsRef, { [key]: value }, { merge: true });
      toast({ title: 'Настройка сохранена', description: `Функция "${featureMetadata.find(f => f.key === key)?.label}" была ${value ? 'включена' : 'отключена'}.` });
    } catch (error) {
      console.error("Error updating feature flag:", error);
      toast({ variant: 'destructive', title: 'Ошибка сохранения', description: 'Не удалось обновить настройку.' });
      // Revert optimistic update
      setFlags(flags);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление функциями</CardTitle>
        <CardDescription>Включайте или отключайте функции приложения в реальном времени.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {featureMetadata.map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-background">
            <div className="space-y-0.5">
              <Label htmlFor={key} className="text-base font-medium">{label}</Label>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Switch
              id={key}
              checked={flags[key] ?? true} // Default to true if not set
              onCheckedChange={(value) => handleFlagChange(key, value)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
