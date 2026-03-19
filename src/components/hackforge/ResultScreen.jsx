import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import GeocitiesCard from "./GeocitiesCard";
import SiteHeader from "./SiteHeader";
import AlienBackground from "./AlienBackground";
import { encodeHack, getShareUrl } from "../../lib/urlEncoder";
import { ThemeProvider, useTheme } from "../../lib/themeContext";
import html2canvas from "html2canvas";

function ResultContent({ hack, isShared, onForgeAnother }) {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { theme } = useTheme();

  const encoded = encodeHack(hack);
  const shareUrl = getShareUrl(encoded);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        width: cardRef.current.scrollWidth,
        height: cardRef.current.scrollHeight,
      });
      const link = document.createElement("a");
      link.download = `hackforge-${hack.problem.slice(0, 20).replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error(e);
    }
    setDownloading(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareCaption = `This absurd life hack just solved my problem. Full screenshot: ${shareUrl} #HackForge #LifeHack`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareCaption)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareCaption)}`;
  const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent("This Geocities life hack actually works — maybe")}`;

  const btnStyle = (color) => ({
    border: `1px solid ${color}40`,
    background: `${color}10`,
    color: color,
    fontFamily: "monospace",
    letterSpacing: "0.15em",
  });

  return (
    <div className="min-h-screen relative" style={{ background: theme.bgGrad || theme.bg }}>
      <AlienBackground />
      <div className="relative z-10">
        <SiteHeader />

        {/* Status bar */}
        <div
          className="px-4 md:px-8 py-3 flex items-center justify-between flex-wrap gap-3"
          style={{ borderBottom: `1px solid ${theme.border}`, background: `${theme.cardBg}` }}
        >
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-3 text-sm font-black tracking-widest uppercase"
            style={{ color: theme.primary, fontFamily: "monospace" }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ background: theme.accent }}
            />
            HACK SYNTHESIZED · MISSION COMPLETE
          </motion.div>
          <motion.button
            onClick={onForgeAnother}
            whileHover={{ scale: 1.05, borderColor: theme.primary }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 text-xs font-black uppercase tracking-widest rounded-sm"
            style={btnStyle(theme.secondary)}
          >
            ◈ FORGE ANOTHER
          </motion.button>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {isShared && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6 p-4 text-center rounded-sm"
              style={{ border: `1px solid ${theme.primary}40`, background: `${theme.primary}08` }}
            >
              <p className="text-sm font-bold tracking-widest" style={{ color: theme.primary, fontFamily: "monospace" }}>
                ◈ SOMEONE BROADCAST THIS HACK TO YOU · FORGE YOUR OWN BELOW ◈
              </p>
            </motion.div>
          )}

          {/* Card */}
          <motion.div
            initial={{ rotateX: 12, scale: 0.92, opacity: 0, y: 30 }}
            animate={{ rotateX: 0, scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 14 }}
            className="mb-8"
            style={{ perspective: "1200px" }}
          >
            <GeocitiesCard hack={hack} cardRef={cardRef} />
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6"
          >
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${theme.accent}30` }}
              whileTap={{ scale: 0.97 }}
              disabled={downloading}
              className="py-4 font-black text-sm uppercase tracking-widest rounded-sm disabled:opacity-40"
              style={btnStyle(theme.accent)}
            >
              {downloading ? "◈ RENDERING..." : "▼ DOWNLOAD PNG"}
            </motion.button>

            <motion.button
              onClick={handleCopyLink}
              whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${theme.primary}30` }}
              whileTap={{ scale: 0.97 }}
              className="py-4 font-black text-sm uppercase tracking-widest rounded-sm"
              style={copied ? btnStyle(theme.primary) : btnStyle(theme.secondary)}
            >
              {copied ? "◈ LINK COPIED!" : "◊ COPY MAGIC LINK"}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
          >
            {[
              { label: "◆ POST TO X", url: twitterUrl, color: theme.primary },
              { label: "◈ WHATSAPP", url: whatsappUrl, color: "#25d366" },
              { label: "◎ REDDIT", url: redditUrl, color: "#ff6314" },
            ].map(({ label, url, color }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 text-xs font-black uppercase tracking-widest rounded-sm"
                  style={btnStyle(color)}
                >
                  {label}
                </motion.button>
              </a>
            ))}
          </motion.div>

          {/* Magic link display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-4 mb-8 flex items-center gap-3 flex-wrap rounded-sm"
            style={{ border: `1px solid ${theme.border}`, background: theme.cardBg }}
          >
            <span className="text-xs font-bold tracking-widest" style={{ color: theme.muted, fontFamily: "monospace" }}>
              ◊ MAGIC LINK:
            </span>
            <span className="text-xs break-all flex-1" style={{ color: theme.primary, fontFamily: "monospace" }}>
              {shareUrl.slice(0, 70)}...
            </span>
            <motion.button
              onClick={handleCopyLink}
              whileHover={{ scale: 1.05 }}
              className="text-xs px-3 py-1 rounded-sm"
              style={{ border: `1px solid ${theme.border}`, color: theme.text, background: `${theme.primary}10`, fontFamily: "monospace" }}
            >
              {copied ? "◈" : "COPY"}
            </motion.button>
          </motion.div>

          {isShared && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-12"
            >
              <p className="text-xs tracking-widest mb-6" style={{ color: theme.muted, fontFamily: "monospace" }}>
                ◇ SYNTHESIZE YOUR OWN PROBLEM INTO CHAOS ◇
              </p>
              <motion.button
                onClick={onForgeAnother}
                whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${theme.primary}30` }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 text-base font-black uppercase tracking-widest rounded-sm"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}15, ${theme.secondary}15)`,
                  border: `1px solid ${theme.primary}`,
                  color: theme.primary,
                  fontFamily: "monospace",
                  letterSpacing: "0.25em",
                }}
              >
                ◆ FORGE MY OWN HACK ◆
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResultScreen(props) {
  return (
    <ThemeProvider>
      <ResultContent {...props} />
    </ThemeProvider>
  );
}