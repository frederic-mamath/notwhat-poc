import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import { isAuthenticated } from '../../lib/auth';
import { Button } from '../../components/ui/button';

export default function CreateChannelPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const createMutation = trpc.channel.create.useMutation({
    onSuccess: (data) => {
      navigate(`/channel/${data.channel.id}`);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (name.length < 3) {
      setError('Channel name must be at least 3 characters');
      return;
    }

    createMutation.mutate({
      name,
      maxParticipants,
      isPrivate,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Live Channel</h1>
        <p>Start a new live video/audio channel</p>

        {error && <div className="bg-red-100 text-red-700 px-3 py-3 rounded-lg mb-5">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 font-medium text-gray-800">Channel Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Stream"
              required
              minLength={3}
              maxLength={100}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="maxParticipants" className="block mb-2 font-medium text-gray-800">Max Participants</label>
            <input
              type="number"
              id="maxParticipants"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
              min={2}
              max={50}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-auto cursor-pointer"
              />
              <span className="text-gray-800">Make this channel private</span>
            </label>
          </div>

          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full"
          >
            {createMutation.isPending ? 'Creating...' : 'Create Channel'}
          </Button>
        </form>

        <div className="text-center mt-5">
          <a onClick={() => navigate('/channels')} className="text-indigo-500 no-underline cursor-pointer hover:underline">
            ← Back to channels
          </a>
        </div>
      </div>
    </div>
  );
}
