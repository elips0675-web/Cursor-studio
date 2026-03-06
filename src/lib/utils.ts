import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ALL_TITLES, TitleMetadata } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Logic to calculate user titles based on profile data.
 * This makes titles "functional" as they reflect real profile quality.
 */
export function getUserTitles(user: any, language: 'RU' | 'EN'): (TitleMetadata & { displayName: string })[] {
  const titles: (TitleMetadata & { displayName: string })[] = [];
  
  // Requirement: High match or mock high likes
  if (user.match >= 90) {
    const meta = ALL_TITLES.find(t => t.id === 'king')!;
    titles.push({ ...meta, displayName: language === 'RU' ? meta.name_ru : meta.name_en });
  }
  
  // Requirement: Many interests
  if (user.interests && user.interests.length >= 4) {
    const meta = ALL_TITLES.find(t => t.id === 'party')!;
    titles.push({ ...meta, displayName: language === 'RU' ? meta.name_ru : meta.name_en });
  }
  
  // Requirement: Completed bio
  if (user.bio && user.bio.length > 20) {
    const meta = ALL_TITLES.find(t => t.id === 'explorer')!;
    titles.push({ ...meta, displayName: language === 'RU' ? meta.name_ru : meta.name_en });
  }
  
  // Requirement: Entry level engagement
  if (user.match >= 80 && titles.length === 0) {
    const meta = ALL_TITLES.find(t => t.id === 'romantic')!;
    titles.push({ ...meta, displayName: language === 'RU' ? meta.name_ru : meta.name_en });
  }

  // Sort by priority (higher first)
  return titles.sort((a, b) => b.priority - a.priority);
}
