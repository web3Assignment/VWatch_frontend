import React, { useState } from 'react';
import { useRoom } from '../../hooks/useRoom';
import { PlaybackLogsModal } from './PlaybackLogsModal';

export const SyncTelemetry: React.FC = () => {
  const { room, playerState, participants } = useRoom();
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  if (!room) return null;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between py-2.5 px-6 bg-surface-container-lowest border-t border-outline-variant/30 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px] text-primary">cell_tower</span>
            WS Connected
          </div>
          <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-4">
            <span>Room: {room.id}</span>
          </div>
          <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-4">
            <span>Peers: {participants.length}</span>
          </div>
          {playerState.videoId && (
            <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-4">
              <span className="material-symbols-outlined text-[14px]">movie</span>
              {playerState.videoId}
            </div>
          )}
          <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Sync OK
          </div>
        </div>

        <button 
          onClick={() => setIsLogsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-primary border border-outline-variant/30 font-bold"
        >
          <span className="material-symbols-outlined text-[14px]">history</span>
          Playback Logs
        </button>
      </div>

      <PlaybackLogsModal 
        isOpen={isLogsOpen} 
        onClose={() => setIsLogsOpen(false)} 
        roomId={room.id} 
      />
    </>
  );
};
