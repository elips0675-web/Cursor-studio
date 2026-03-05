
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Maximize,
  Minimize,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function VideoCallDialog({ open, onOpenChange, user }: { open: boolean, onOpenChange: (open: boolean) => void, user: any }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      setCallDuration(0); // Reset on new call
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [open]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const localUserImage = PlaceHolderImages.find(img => img.id === 'me')?.imageUrl || PlaceHolderImages[10].imageUrl;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "max-w-none w-screen h-screen p-0 border-0 bg-black flex flex-col items-center justify-center transition-all duration-500",
          isFullScreen ? "rounded-none" : "rounded-3xl max-w-[480px] h-[95vh] mx-auto"
        )}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <motion.div 
          layout 
          className="relative w-full h-full rounded-3xl overflow-hidden bg-gray-900 flex items-center justify-center"
        >
          {/* Remote user video */}
          <div className="absolute inset-0">
            <Image
              src={user.img}
              alt={user.name}
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center text-white">
             <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/50 mb-4 shadow-lg">
                <Image src={user.img} alt={user.name} width={96} height={96} className="object-cover" />
             </div>
             <h3 className="text-2xl font-bold">{user.name}</h3>
             <p className="text-lg font-mono tracking-widest mt-1">{formatDuration(callDuration)}</p>
          </div>

          {/* Local user video */}
          <AnimatePresence>
            {!isVideoOff && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    drag
                    dragConstraints={{ top: -250, left: -100, right: 100, bottom: 250 }}
                    className="absolute bottom-28 sm:bottom-32 right-4 w-28 h-40 bg-gray-800 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl cursor-grab active:cursor-grabbing"
                >
                    <Image
                        src={localUserImage}
                        alt="You"
                        fill
                        className="object-cover"
                    />
                    {isMuted && (
                        <div className="absolute bottom-1 right-1 p-1 bg-black/50 rounded-full">
                            <MicOff size={12} className="text-white" />
                        </div>
                    )}
                </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-md p-3 rounded-full shadow-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className={cn(
                "w-14 h-14 rounded-full text-white hover:bg-white/20",
                isMuted && "bg-white/20"
              )}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={cn(
                "w-14 h-14 rounded-full text-white hover:bg-white/20",
                isVideoOff && "bg-white/20"
              )}
            >
              {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
            </Button>
            <Button
              size="icon"
              onClick={() => onOpenChange(false)}
              className="w-16 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white text-2xl"
            >
              <PhoneOff size={28} />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full text-white bg-black/40 hover:bg-white/20"
          >
            {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
