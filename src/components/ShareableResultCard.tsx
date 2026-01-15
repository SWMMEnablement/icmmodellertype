import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { PersonalityType } from "@/data/personalities";
import { Download, Twitter, Linkedin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareableResultCardProps {
  personality: PersonalityType;
  scores: Record<string, number>;
  isManagerMode?: boolean;
}

export const ShareableResultCard = ({ personality, scores, isManagerMode = false }: ShareableResultCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const isHybrid = personality.isHybrid && personality.type !== 'CONTEXT' && personality.type !== 'NAVIGATOR';
  const isContext = personality.type === 'CONTEXT' || personality.type === 'NAVIGATOR';

  // Calculate percentages for display
  const hybridScores = {
    H: scores.H || 0,
    X: scores.X || 0,
    Y: scores.Y || 0,
    Z: scores.Z || 0,
  };
  const totalHybrid = hybridScores.H + hybridScores.X + hybridScores.Y + hybridScores.Z;
  const hybridPercentage = Math.round((totalHybrid / 20) * 100);

  const contextScores = {
    MA_CTX: scores.MA_CTX || 0,
    WS_CTX: scores.WS_CTX || 0,
    PS_CTX: scores.PS_CTX || 0,
    DQ_CTX: scores.DQ_CTX || 0,
  };
  const totalContext = contextScores.MA_CTX + contextScores.WS_CTX + contextScores.PS_CTX + contextScores.DQ_CTX;
  const contextPercentage = Math.round((totalContext / 20) * 100);

  const getGradientColors = () => {
    if (isContext) return { from: '#f59e0b', to: '#ea580c' };
    if (isHybrid) return { from: '#a855f7', to: '#7c3aed' };
    
    // Extract colors from personality.color
    const colorMap: Record<string, { from: string; to: string }> = {
      'from-blue-600 to-blue-800': { from: '#2563eb', to: '#1e40af' },
      'from-teal-500 to-teal-700': { from: '#14b8a6', to: '#0f766e' },
      'from-indigo-500 to-indigo-700': { from: '#6366f1', to: '#4338ca' },
      'from-slate-600 to-slate-800': { from: '#475569', to: '#1e293b' },
      'from-amber-600 to-amber-700': { from: '#d97706', to: '#b45309' },
      'from-emerald-500 to-emerald-700': { from: '#10b981', to: '#047857' },
      'from-cyan-500 to-cyan-700': { from: '#06b6d4', to: '#0e7490' },
      'from-pink-500 to-pink-700': { from: '#ec4899', to: '#be185d' },
      'from-lime-500 to-lime-700': { from: '#84cc16', to: '#4d7c0f' },
      'from-red-500 to-red-700': { from: '#ef4444', to: '#b91c1c' },
      'from-purple-500 to-violet-700': { from: '#a855f7', to: '#6d28d9' },
      'from-violet-500 to-purple-700': { from: '#8b5cf6', to: '#7e22ce' },
      'from-fuchsia-500 to-purple-600': { from: '#d946ef', to: '#9333ea' },
      'from-amber-500 to-orange-600': { from: '#f59e0b', to: '#ea580c' },
      'from-orange-500 to-amber-600': { from: '#f97316', to: '#d97706' },
    };
    return colorMap[personality.color] || { from: '#3b82f6', to: '#1e40af' };
  };

  const colors = getGradientColors();

  const generateImage = async () => {
    if (!cardRef.current) return null;
    
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#0f172a',
      });
      return dataUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.download = `icm-modeller-${personality.type.toLowerCase()}.png`;
    link.href = dataUrl;
    link.click();
    toast.success('Image downloaded!');
  };

  const handleShareTwitter = async () => {
    const text = isManagerMode
      ? `My manager is ${personality.name} (${personality.type})! 👔🌊\n\nWhat's YOUR manager's ICM Modeller type?\n\n#ICMModeller #HydraulicModeling #WaterIndustry`
      : `I'm ${personality.name} (${personality.type})! 🌊\n\nTake the ICM Modeller Personality Quiz to discover your hydraulic modeling style:\n\n#ICMModeller #HydraulicModeling #WaterIndustry`;
    const url = window.location.origin;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareLinkedIn = async () => {
    const url = window.location.origin;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleNativeShare = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], `icm-modeller-${personality.type.toLowerCase()}.png`, { type: 'image/png' });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: isManagerMode ? `My manager is ${personality.name}!` : `I'm ${personality.name}!`,
          text: isManagerMode 
            ? `My manager's ICM Modeller type: ${personality.type} - ${personality.name}`
            : `I discovered my ICM Modeller type: ${personality.type} - ${personality.name}`,
          files: [file],
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('Failed to share');
        }
      }
    } else {
      handleDownload();
    }
  };

  return (
    <div className="space-y-4">
      {/* Shareable Card - Hidden for rendering */}
      <div className="relative overflow-hidden rounded-xl">
        <div
          ref={cardRef}
          className="p-6 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
            width: '600px',
            height: '315px',
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 600 315">
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-white/70 text-sm font-medium tracking-widest uppercase">
                  {isManagerMode ? "My Manager's Type" : "My ICM Modeller Type"}
                </span>
                {isManagerMode && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs text-white">
                    👔 Manager
                  </span>
                )}
                {!isManagerMode && (isHybrid || isContext) && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs text-white">
                    {isContext ? 'Context-Driven' : 'Hybrid'}
                  </span>
                )}
              </div>
              <div className="text-white/80 text-sm font-medium">
                🌊 ICM Personality Quiz
              </div>
            </div>

            {/* Main content */}
            <div className="text-center">
              <h2 className="text-6xl font-bold text-white mb-2 font-display">
                {personality.type}
              </h2>
              <p className="text-2xl text-white/90 font-medium">
                {personality.name}
              </p>
              {(isHybrid || isContext) && (
                <p className="text-white/70 text-sm mt-2">
                  {isContext ? `${contextPercentage}% context-driven` : `${hybridPercentage}% adaptive`}
                </p>
              )}
            </div>

            {/* Footer with top strengths */}
            <div className="flex justify-between items-end">
              <div className="flex gap-2">
                {personality.strengths.slice(0, 3).map((strength, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium"
                  >
                    {strength}
                  </span>
                ))}
              </div>
              <div className="text-white/60 text-xs">
                icmmodellertype.lovable.app
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          onClick={handleDownload}
          disabled={isGenerating}
          variant="outline"
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button
          onClick={handleShareTwitter}
          variant="outline"
          className="gap-2"
        >
          <Twitter className="w-4 h-4" />
          Share on X
        </Button>
        <Button
          onClick={handleShareLinkedIn}
          variant="outline"
          className="gap-2"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Button>
        {navigator.share && (
          <Button
            onClick={handleNativeShare}
            disabled={isGenerating}
            variant="outline"
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        )}
      </div>
    </div>
  );
};
