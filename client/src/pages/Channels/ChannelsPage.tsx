import { trpc } from '../../lib/trpc';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isAuthenticated } from '../../lib/auth';
import { Button } from '../../components/ui/button';

export default function ChannelsPage() {
  const navigate = useNavigate();
  const { data: channels, isLoading } = trpc.channel.list.useQuery();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="text-center p-10 text-white text-lg">Loading channels...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-5 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-8 text-white">
        <h1>Live Channels</h1>
        <Button onClick={() => navigate('/create-channel')}>
          Create Channel
        </Button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {channels?.length === 0 && (
          <div className="text-center py-16 px-5 text-white col-span-full">
            <p>No active channels. Be the first to create one!</p>
          </div>
        )}

        {channels?.map((channel) => (
          <div key={channel.id} className="bg-white rounded-xl p-6 flex flex-col gap-4">
            <div>
              <h3 className="m-0 text-xl text-gray-900">{channel.name}</h3>
              <div className="flex gap-3 text-sm text-gray-600 mt-2">
                <span>
                  👥 {channel.participantCount} / {channel.max_participants}
                </span>
                {channel.is_private && (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">🔒 Private</span>
                )}
              </div>
            </div>
            <Button
              onClick={() => navigate(`/channel/${channel.id}`)}
              disabled={channel.participantCount >= (channel.max_participants || 10)}
            >
              {channel.participantCount >= (channel.max_participants || 10)
                ? 'Full'
                : 'Join'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
