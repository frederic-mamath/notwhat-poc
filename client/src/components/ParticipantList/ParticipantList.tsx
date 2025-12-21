import { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';

interface ParticipantListProps {
  localUserId: number;
  remoteUsers: IAgoraRTCRemoteUser[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ParticipantList({
  localUserId,
  remoteUsers,
  isOpen,
  onClose,
}: ParticipantListProps) {
  if (!isOpen) return null;

  const totalParticipants = remoteUsers.length + 1;

  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <h3>
            Participants ({totalParticipants})
          </h3>
          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <div>
          <div>
            <div>
              {localUserId.toString().charAt(0)}
            </div>
            <div>
              <span>You</span>
              <span>ID: {localUserId}</span>
            </div>
            <span>Host</span>
          </div>

          {remoteUsers.map((user) => (
            <div key={user.uid}>
              <div>
                {user.uid.toString().charAt(0)}
              </div>
              <div>
                <span>User {user.uid}</span>
                <span>ID: {user.uid}</span>
              </div>
              <div>
                {user.hasAudio && <span title="Audio enabled">🎤</span>}
                {user.hasVideo && <span title="Video enabled">📷</span>}
              </div>
            </div>
          ))}

          {remoteUsers.length === 0 && (
            <div>
              <p>No other participants yet</p>
              <span>Share the channel link to invite others</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
