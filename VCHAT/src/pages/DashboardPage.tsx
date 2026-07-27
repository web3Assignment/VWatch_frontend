import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/shared/Navbar';
import { Button } from '../components/shared/Button';
import { GlassCard } from '../components/shared/GlassCard';
import { RoomCard } from '../components/dashboard/RoomCard';
import { CreateRoomModal } from '../components/dashboard/CreateRoomModal';
import { JoinRoomModal } from '../components/dashboard/JoinRoomModal';
import { roomService } from '../services/room.service';
import { Room } from '../types/room';
import { useAuth } from '../hooks/useAuth';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomService.listMyRooms();
        setRooms(data);
      } catch (error) {
        console.error('Failed to load rooms', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, [isCreateOpen]);

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    room.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteRoom = async (roomId: string) => {
    try {
      await roomService.deleteRoom(roomId);
      setRooms(prev => prev.filter(r => r.id !== roomId));
    } catch (err) {
      console.error('Failed to delete room', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface pt-20">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-10 py-10 w-full">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest">Dashboard Overview</span>
            <h1 className="font-display-lg text-3xl md:text-4xl text-on-surface mt-1">Welcome back, {user?.username || 'User'}</h1>
            <p className="font-body-md text-on-surface-variant">Manage your watch parties, connections, and live sync sessions</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsJoinOpen(true)} icon={<span className="material-symbols-outlined text-[20px]">login</span>}>
              Join Party
            </Button>
            <Button variant="primary" onClick={() => setIsCreateOpen(true)} icon={<span className="material-symbols-outlined text-[20px]">add</span>}>
              Create Room
            </Button>
          </div>
        </header>

        {/* Stats Summary Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <GlassCard className="p-6 flex items-center justify-between">
            <div>
              <p className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">Active Rooms</p>
              <h3 className="font-headline-sm text-3xl text-on-surface font-bold">{rooms.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">meeting_room</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex items-center justify-between">
            <div>
              <p className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">Avg Sync Latency</p>
              <h3 className="font-headline-sm text-3xl text-tertiary font-bold">14 ms</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-2xl">bolt</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex items-center justify-between">
            <div>
              <p className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">Watch Time</p>
              <h3 className="font-headline-sm text-3xl text-on-surface font-bold">28.5 hrs</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <span className="material-symbols-outlined text-2xl">schedule</span>
            </div>
          </GlassCard>
        </section>

        {/* Room Filter & Search Bar */}
        <section className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="font-headline-sm text-xl text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">grid_view</span>
            Your Watch Rooms
          </h2>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary transition-colors font-label-mono"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
          </div>
        </section>

        {/* Room Grid */}
        <section className="mb-16">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 rounded-full border-primary border-t-transparent animate-spin" />
            </div>
          ) : filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map(room => (
                <RoomCard key={room.id} room={room} onDelete={handleDeleteRoom} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface-container-low rounded-[24px] border border-outline-variant/20 border-dashed">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-4">inbox</span>
              <p className="font-body-md text-on-surface-variant mb-4">No rooms found.</p>
              <Button variant="outline" onClick={() => setIsCreateOpen(true)}>Create a new room</Button>
            </div>
          )}
        </section>
      </main>

      <CreateRoomModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <JoinRoomModal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} />
    </div>
  );
};
