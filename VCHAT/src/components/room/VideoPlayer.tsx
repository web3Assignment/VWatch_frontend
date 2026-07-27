import React, { useRef, useEffect, useCallback } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { usePlayer } from '../../hooks/usePlayer';
import { useRoom } from '../../hooks/useRoom';
import { Role } from '../../types/participant';
import { Button } from '../shared/Button';
import { extractYouTubeVideoId } from '../../utils/youtube';
import env from '../../config/env';
import {
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX,
  Search, Home, TrendingUp, Radio, Library, Loader2, Clapperboard, Smile, Video, Maximize
} from 'lucide-react';

interface VideoRecommendation {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  videoId: string;
}

const REACTION_EMOJIS = ['🔥', '❤️', '👏', '🎉', '😮', '🚀'];

interface YouTubeWebsiteProps {
  onChangeVideoClick?: () => void;
  onSendReaction?: (emoji: string) => void;
}

export const YouTubeWebsite: React.FC<YouTubeWebsiteProps> = ({ onChangeVideoClick, onSendReaction }) => {
  const { playerState, play, pause, seek, changeVideo } = usePlayer();
  const { room, participants, selfId } = useRoom();

  // ── react-youtube player ref (the actual YT player API object) ──
  const playerRef = useRef<YouTubePlayer | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = React.useState(false);

  // ── Search state ──
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<'home' | 'trending' | 'subscriptions' | 'library'>('home');
  const [searchResults, setSearchResults] = React.useState<VideoRecommendation[] | null>(null);
  const [searching, setSearching] = React.useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeVideoId = extractYouTubeVideoId(playerState.videoId || room?.initialVideoId || 'dQw4w9WgXcQ');

  const currentUserRole = participants.find(p => String(p.userId) === String(selfId))?.role || Role.VIEWER;
  const canControl = currentUserRole === Role.HOST || currentUserRole === Role.MODERATOR;
  const canControlRef = useRef(canControl);

  useEffect(() => {
    canControlRef.current = canControl;
  }, [canControl]);

  // ── Mute / unmute via react-youtube API ──
  const toggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) { playerRef.current.unMute(); setIsMuted(false); }
      else { playerRef.current.mute(); setIsMuted(true); }
    } catch {}
  };

  // ── react-youtube onReady: sync initial state ──
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    try {
      event.target.seekTo(playerState.currentTime, true);
      if (playerState.state === 'playing') event.target.playVideo();
    } catch {}
  };

  // ── react-youtube onStateChange: host emits, viewer snaps back ──
  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    const YT_STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2 };

    // Viewer: enforce host's state
    if (!canControlRef.current) {
      if (event.data === YT_STATE.ENDED) { playerRef.current?.pauseVideo(); return; }
      if (playerState.state === 'playing' && event.data !== YT_STATE.PLAYING) {
        playerRef.current?.playVideo();
      } else if (playerState.state === 'paused' && event.data === YT_STATE.PLAYING) {
        playerRef.current?.pauseVideo();
      }
      return;
    }

    // Host: emit socket event when they play/pause
    if (event.data === YT_STATE.PLAYING && playerState.state !== 'playing') {
      play(event.target.getCurrentTime(), activeVideoId);
    } else if ((event.data === YT_STATE.PAUSED || event.data === YT_STATE.ENDED) && playerState.state !== 'paused') {
      pause(event.target.getCurrentTime() || 0, activeVideoId);
    }
  };

  // ── Sync playerState → YT player whenever store updates (from socket) ──
  useEffect(() => {
    if (!playerRef.current || !activeVideoId) return;

    if (playerState.state === 'playing') {
      playerRef.current.playVideo();
    } else if (playerState.state === 'paused') {
      playerRef.current.pauseVideo();
    }

    try {
      const diff = Math.abs(playerRef.current.getCurrentTime() - playerState.currentTime);
      if (diff > 2) playerRef.current.seekTo(playerState.currentTime, true);
    } catch {}
  }, [playerState.state, playerState.currentTime, playerState.videoId, activeVideoId]);

  // ── Manual controls ──
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleManualPlay = () => {
    if (!canControl) return;
    const time = playerRef.current ? playerRef.current.getCurrentTime() : playerState.currentTime;
    play(time, activeVideoId);
  };

  const handleManualPause = () => {
    if (!canControl) return;
    const time = playerRef.current ? playerRef.current.getCurrentTime() : playerState.currentTime;
    pause(time, activeVideoId);
  };

  const handleSeekOffset = (seconds: number) => {
    if (!canControl) return;
    const current = playerRef.current ? playerRef.current.getCurrentTime() : playerState.currentTime;
    seek(Math.max(0, current + seconds), activeVideoId);
  };

  // ── YouTube search ──
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) { setSearchResults(null); return; }
    if (!env.YOUTUBE_API_KEY) { setSearchResults(null); return; }
    setSearching(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${env.YOUTUBE_API_KEY}`
      );
      const data = await res.json();
      if (data.items) {
        setSearchResults(data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
          videoId: item.id.videoId,
        })));
      }
    } catch { setSearchResults(null); }
    finally { setSearching(false); }
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => performSearch(searchQuery), 500);
    return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); };
  }, [searchQuery, performSearch]);

  const handleVideoSelect = useCallback((videoId: string) => {
    if (!canControlRef.current) return;
    changeVideo(videoId);
  }, [changeVideo]);

  const TABS = [
    { key: 'home' as const, label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { key: 'trending' as const, label: 'Trending', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { key: 'subscriptions' as const, label: 'Subscriptions', icon: <Radio className="w-3.5 h-3.5" /> },
    { key: 'library' as const, label: 'Library', icon: <Library className="w-3.5 h-3.5" /> },
  ];

  const isPlaying = playerState.state === 'playing';

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 items-stretch">

      {/* ── LEFT BOX: Video + Controls ── */}
      <div ref={videoContainerRef} className="flex-1 min-w-0 flex flex-col border border-outline-variant/30 rounded-2xl overflow-hidden bg-surface-container/40 backdrop-blur-sm shadow-xl">

        {/* Video player */}
        <div className="relative w-full aspect-video bg-black flex-1 min-h-[300px]">

          {/* Status pill */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
            <span className={`font-label-caps text-[10px] font-bold uppercase tracking-widest ${isPlaying ? 'text-green-400' : 'text-yellow-400'}`}>
              {isPlaying ? 'LIVE' : 'PAUSED'}
            </span>
          </div>

          {/* Viewer overlay — blocks timeline scrubbing */}
          {!canControl && (
            <div className="absolute inset-0 z-30 bg-transparent cursor-not-allowed" title="Playback is controlled by the host" />
          )}

          <YouTube
            key={activeVideoId}
            videoId={activeVideoId}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: isPlaying ? 1 : 0,
                controls: 1,
                disablekb: canControl ? 0 : 1,
                modestbranding: 1,
                rel: 0,
                playsinline: 1,
              },
            }}
            onReady={onPlayerReady}
            onStateChange={onStateChange}
            className="w-full h-full"
            iframeClassName="w-full h-full"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-outline-variant/30" />

        {/* Controls bar */}
        <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 bg-surface-container/60">
          <div className="flex items-center gap-2 flex-wrap">
            {isPlaying ? (
              <Button variant="primary" onClick={handleManualPause} disabled={!canControl} icon={<Pause className="w-4 h-4" />}>Pause</Button>
            ) : (
              <Button variant="primary" onClick={handleManualPlay} disabled={!canControl} icon={<Play className="w-4 h-4" />}>Play</Button>
            )}
            <button onClick={() => handleSeekOffset(-10)} disabled={!canControl} className="flex items-center gap-1 px-3 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-on-surface hover:bg-surface-container-highest disabled:opacity-40 transition-colors font-label-mono text-xs" title="Rewind 10s">
              <RotateCcw className="w-3.5 h-3.5 text-primary" /> -10s
            </button>
            <button onClick={() => handleSeekOffset(10)} disabled={!canControl} className="flex items-center gap-1 px-3 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-on-surface hover:bg-surface-container-highest disabled:opacity-40 transition-colors font-label-mono text-xs" title="Forward 10s">
              <RotateCw className="w-3.5 h-3.5 text-primary" /> +10s
            </button>
            <button onClick={toggleMute} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-on-surface hover:bg-surface-container-highest transition-colors font-label-mono text-xs" title={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-error" /> : <Volume2 className="w-3.5 h-3.5 text-primary" />}
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label-mono text-[10px] text-on-surface-variant bg-surface-container-high px-2.5 py-1.5 rounded-lg border border-outline-variant/20">
              ID: <span className="text-primary font-bold">{activeVideoId}</span>
            </span>
            {onChangeVideoClick && (
              <Button variant="outline" onClick={onChangeVideoClick} disabled={!canControl} icon={<Video className="w-4 h-4" />}>Change Video</Button>
            )}
            <button onClick={handleFullscreen} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-on-surface hover:bg-surface-container-highest transition-colors font-label-mono text-xs" title="Toggle Fullscreen">
              <Maximize className="w-3.5 h-3.5 text-primary" />
            </button>
          </div>
        </div>

        {/* Reactions row */}
        {onSendReaction && (
          <div className="px-4 py-3 flex items-center gap-3 bg-surface-container/60 border-t border-primary/20 shadow-[0_-4px_15px_rgba(217,134,47,0.05)] relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="flex items-center gap-1.5 text-on-surface-variant relative z-10">
              <Smile className="w-4 h-4 text-primary" />
              <span className="font-label-caps text-[10px] font-bold text-primary uppercase tracking-widest">React</span>
            </div>
            <div className="h-4 w-px bg-outline-variant/40 relative z-10" />
            <div className="flex items-center gap-1.5 relative z-10">
              {REACTION_EMOJIS.map(emoji => (
                <button key={emoji} onClick={() => onSendReaction(emoji)}
                  className="text-xl hover:scale-125 active:scale-95 transition-transform p-1.5 rounded-xl hover:bg-surface-container-high border border-transparent hover:border-primary/30"
                  title={`Send ${emoji}`}>{emoji}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT BOX: YouTube Search ── */}
      <div className="w-full lg:w-[340px] xl:w-[360px] flex-shrink-0 flex flex-col border border-outline-variant/30 rounded-2xl overflow-hidden bg-surface-container/40 backdrop-blur-sm shadow-xl">

        {/* Panel header */}
        <div className="px-4 py-3 border-b border-outline-variant/30 bg-surface-container/60 flex items-center gap-2 flex-shrink-0">
          <Clapperboard className="w-4 h-4 text-primary" />
          <span className="font-label-caps text-xs text-on-surface uppercase tracking-wider font-bold">Video Search</span>
        </div>

        {/* Search input */}
        <div className="px-3 pt-3 pb-2 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search YouTube..."
              className="w-full bg-surface-container-high border border-outline-variant/40 rounded-xl pl-9 pr-4 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors font-body-md" />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-3 pb-2 flex-shrink-0">
          <div className="flex bg-surface-container-high rounded-xl p-0.5 border border-outline-variant/20">
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-[10px] text-[10px] font-label-mono transition-all ${activeTab === tab.key ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                title={tab.label}>
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-outline-variant/20 mx-3" />

        {/* Results */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1.5">
          {searching && <div className="flex items-center justify-center py-10"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>}

          {!searching && !searchQuery.trim() && (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center">
                <Search className="w-5 h-5 text-on-surface-variant/40" />
              </div>
              <p className="text-xs text-on-surface-variant font-body-md">Search YouTube for videos</p>
            </div>
          )}

          {!searching && searchQuery.trim() && searchResults !== null && searchResults.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
              <Search className="w-6 h-6 text-on-surface-variant/40" />
              <p className="text-xs text-on-surface-variant font-body-md">No results for "{searchQuery}"</p>
            </div>
          )}

          {!searching && searchResults !== null && searchResults.map(video => (
            <button key={video.id} onClick={() => handleVideoSelect(video.videoId)}
              className={`w-full flex gap-2.5 p-2 rounded-xl border transition-all text-left group ${canControl ? 'border-transparent hover:border-primary/30 hover:bg-surface-container-high cursor-pointer' : 'border-transparent opacity-60 cursor-not-allowed'}`}
              title={canControl ? video.title : 'Only the host can change the video'}>
              <div className="relative flex-shrink-0 w-[100px] h-[60px] rounded-lg overflow-hidden bg-surface-container">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <Play className="w-5 h-5 text-white" fill="white" />
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                <h4 className="text-[11px] font-body-md text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-snug">{video.title}</h4>
                <span className="text-[10px] font-label-mono text-on-surface-variant truncate">{video.channel}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};