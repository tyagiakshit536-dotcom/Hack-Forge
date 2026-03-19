import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Link2, Share2, RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

export default function ShareButtons({ magicLink, cardRef, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(magicLink);
    setCopied(true);
    toast.success('Magic link copied! Share it anywhere 🚀');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!cardRef?.current) return;
    setDownloading(true);
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: '#0a0a1a',
      useCORS: true,
      logging: false,
    });
    const link = document.createElement('a');
    link.download = 'my-future-timeline.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloading(false);
    toast.success('Timeline saved! 📸');
  };

  const handleShareTwitter = () => {
    const text = `POV: My future just dropped 😂🔮 See yours → ${magicLink} #FutureYou`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      className="space-y-3 max-w-lg mx-auto"
    >
      <p className="text-center text-sm text-muted-foreground font-space font-semibold mb-4">
        🎉 Your future is ready! Share it with the world.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full bg-primary text-primary-foreground hover:opacity-90 rounded-xl py-6 font-space font-semibold"
            style={{ boxShadow: '0 0 20px hsl(var(--primary)/0.3)' }}
          >
            <Download className="w-4 h-4 mr-2" />
            {downloading ? 'Saving...' : 'Download PNG'}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full rounded-xl py-6 font-space font-semibold border-primary/30 text-primary hover:bg-primary/10"
          >
            {copied ? (
              <><Check className="w-4 h-4 mr-2" />Copied!</>
            ) : (
              <><Link2 className="w-4 h-4 mr-2" />Copy Link</>
            )}
          </Button>
        </motion.div>
      </div>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button
          onClick={handleShareTwitter}
          variant="outline"
          className="w-full rounded-xl py-5 border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 font-inter"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share on X / Twitter
        </Button>
      </motion.div>

      <Button
        onClick={onRegenerate}
        variant="ghost"
        className="w-full rounded-xl py-5 text-muted-foreground hover:text-primary font-inter"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Generate Another Future
      </Button>
    </motion.div>
  );
}