import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types/participant';
import { Navbar } from '../components/shared/Navbar';
import { Button } from '../components/shared/Button';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { YouTubeWebsite } from '../components/room/VideoPlayer';
import { ParticipantList } from '../components/room/ParticipantList';
import { ChatPanel } from '../components/room/ChatPanel';
import { SyncTelemetry } from '../components/room/SyncTelemetry';
import { ChangeVideoModal } from '../components/room/ChangeVideoModal';
import { RoleManagementModal } from '../components/room/RoleManagementModal';
import { RoleBadge } from '../components/shared/RoleBadge';
import { useParticipants } from '../hooks/useParticipants';
import { useToast } from '../components/shared/Toast';
import { useRoomStore } from '../store/useRoomStore';
import { FloatingReactions } from '../components/room/FloatingReactions';
import { MessageSquare, X } from 'lucide-react';

export const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { room, joinRoom, leaveRoom, isLoading, participants, selfId } = useRoom();
  const { reactions, sendEmojiReaction, removeReaction } = useRoomStore();
  const { assignRole } = useParticipants();
  const { showToast } = useToast();
  
  const [isChangeVideoOpen, setIsChangeVideoOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  useEffect(() => {
    let isActive = true;

    if (!roomId || roomId === 'undefined') {
      navigate('/dashboard', { replace: true });
      return () => {
        isActive = false;
      };
    }

    joinRoom(roomId).catch((err: any) => {
      if (!isActive) return;
      showToast(err?.message || 'Unable to join this room', 'error');
      navigate('/dashboard', { replace: true });
    });

    return () => {
      isActive = false;
      leaveRoom();
    };
  }, [roomId, joinRoom, leaveRoom, navigate, showToast]);

  const currentUserRole = participants.find(p => String(p.userId) === String(selfId))?.role || Role.VIEWER;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/room/${roomId}`);
    showToast('Room link copied to clipboard!', 'success');
  };

  if (isLoading || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen flex flex-col pt-16 overflow-y-auto lg:overflow-hidden">
      <Navbar />
      
      {/* Room Toolbar */}
      <div className="bg-surface-container border-b border-outline-variant/30 px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
           <h1 className="font-headline-sm text-base md:text-lg text-on-surface">{room.name}</h1>
           <span className="font-label-mono text-[10px] md:text-xs text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">ID: {room.id}</span>
           
           {/* Assigned Role Badge */}
           <div className="flex items-center gap-2">
              <RoleBadge role={currentUserRole} />
           </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" icon={<span className="material-symbols-outlined text-sm">link</span>} onClick={handleCopyLink}>
             <span className="hidden sm:inline">Copy Link</span>
          </Button>
          
          {(currentUserRole === Role.HOST || currentUserRole === Role.MODERATOR) && (
            <Button variant="outline" onClick={() => setIsChangeVideoOpen(true)} icon={<span className="material-symbols-outlined text-sm">movie</span>}>
              <span className="hidden sm:inline">Change Video</span>
            </Button>
          )}

          {currentUserRole === Role.HOST && (
            <Button variant="outline" onClick={() => setIsRoleModalOpen(true)} icon={<span className="material-symbols-outlined text-sm">manage_accounts</span>}>
              <span className="hidden sm:inline">Roles</span>
            </Button>
          )}
          
          <Button variant="danger" onClick={() => navigate('/dashboard')} icon={<span className="material-symbols-outlined text-sm">logout</span>}>
            Leave
          </Button>
        </div>
      </div>

      {/* Main Room Layout */}
      <div className="flex-1 flex flex-col lg:flex-row bg-background min-h-0">
         {/* Video Area (left side) */}
         <div className="w-full lg:flex-[3] flex flex-col p-3 md:p-6 lg:min-h-0 lg:overflow-y-auto custom-scrollbar flex-shrink-0">
           <div className="w-full rounded-[20px] md:rounded-[24px] flex flex-col items-center justify-start bg-surface-container/20 border border-outline-variant/20 relative p-3 md:p-6">
             <FloatingReactions reactions={reactions} onRemove={removeReaction} />
             <YouTubeWebsite
               onChangeVideoClick={() => setIsChangeVideoOpen(true)}
               onSendReaction={sendEmojiReaction}
             />
           </div>
         </div>
         
         {/* Sidebar (right side) */}
         <div className="w-full lg:w-[380px] xl:w-[400px] border-t lg:border-t-0 lg:border-l border-outline-variant/30 flex flex-col p-4 md:p-6 gap-4 h-auto lg:h-full lg:min-h-0 overflow-hidden flex-shrink-0">
            <div className="h-[200px] lg:h-[30%] lg:min-h-[160px] lg:max-h-[220px] flex flex-col min-h-0 flex-shrink-0">
               <ParticipantList />
            </div>
            {/* Desktop Only Chat Panel */}
            <div className="hidden lg:flex flex-1 min-h-0 flex-col overflow-hidden">
               <ChatPanel />
            </div>
         </div>
      </div>
      
      {/* Mobile Floating Chatbot Trigger Button */}
      <button
        onClick={() => setIsMobileChatOpen(!isMobileChatOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center gap-2 bg-gradient-to-r from-primary to-tertiary text-on-primary px-4 py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
        title="Open Room Chat"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="font-label-mono text-xs font-bold">Chat</span>
      </button>

      {/* Mobile Floating Chat Overlay Drawer */}
      {isMobileChatOpen && (
        <div className="fixed inset-x-4 top-20 bottom-20 z-50 lg:hidden rounded-[24px] shadow-2xl overflow-hidden border border-outline-variant/40 bg-surface/95 backdrop-blur-2xl flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          <div className="p-3.5 border-b border-outline-variant/30 bg-surface-container/80 flex items-center justify-between flex-shrink-0">
            <h3 className="font-headline-sm text-sm text-on-surface flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> Live Room Chat
            </h3>
            <button 
              onClick={() => setIsMobileChatOpen(false)} 
              className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <ChatPanel />
          </div>
        </div>
      )}

      {/* Footer Telemetry */}
      <SyncTelemetry />

      {/* Modals */}
      <ChangeVideoModal isOpen={isChangeVideoOpen} onClose={() => setIsChangeVideoOpen(false)} />
      <RoleManagementModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />
    </div>
  );
};
