import { trpc } from '../../lib/trpc';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isAuthenticated } from '../../lib/auth';

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
      <div>
        <div>Loading channels...</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Live Channels</h1>
        <button onClick={() => navigate('/create-channel')}>
          Create Channel
        </button>
      </div>

      <div>
        {channels?.length === 0 && (
          <div>
            <p>No active channels. Be the first to create one!</p>
          </div>
        )}

        {channels?.map((channel) => (
          <div key={channel.id}>
            <div>
              <h3>{channel.name}</h3>
              <div>
                <span>
                  👥 {channel.participantCount} / {channel.max_participants}
                </span>
                {channel.is_private && (
                  <span>🔒 Private</span>
                )}
              </div>
            </div>
            <button
              onClick={() => navigate(`/channel/${channel.id}`)}
              disabled={channel.participantCount >= (channel.max_participants || 10)}
            >
              {channel.participantCount >= (channel.max_participants || 10)
                ? 'Full'
                : 'Join'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
