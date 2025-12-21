import { useEffect, useState } from 'react';
import { IAgoraRTCClient } from 'agora-rtc-sdk-ng';

interface NetworkQualityProps {
  client: IAgoraRTCClient | null;
}

type QualityLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface NetworkStats {
  downlinkQuality: QualityLevel;
  uplinkQuality: QualityLevel;
}

export default function NetworkQuality({ client }: NetworkQualityProps) {
  const [stats, setStats] = useState<NetworkStats>({
    downlinkQuality: 0,
    uplinkQuality: 0,
  });

  useEffect(() => {
    if (!client) return;

    const handleNetworkQuality = (stats: {
      downlinkNetworkQuality: QualityLevel;
      uplinkNetworkQuality: QualityLevel;
    }) => {
      setStats({
        downlinkQuality: stats.downlinkNetworkQuality,
        uplinkQuality: stats.uplinkNetworkQuality,
      });
    };

    client.on('network-quality', handleNetworkQuality);

    return () => {
      client.off('network-quality', handleNetworkQuality);
    };
  }, [client]);

  const getQualityLabel = (quality: QualityLevel): string => {
    switch (quality) {
      case 0:
        return 'Unknown';
      case 1:
        return 'Excellent';
      case 2:
        return 'Good';
      case 3:
        return 'Fair';
      case 4:
        return 'Poor';
      case 5:
      case 6:
        return 'Bad';
      default:
        return 'Unknown';
    }
  };

  if (!client) return null;

  const avgQuality = Math.max(stats.downlinkQuality, stats.uplinkQuality);
  const qualityLabel = getQualityLabel(avgQuality);

  return (
    <div title={`Network: ${qualityLabel}`}>
      <span>Network: {qualityLabel}</span>
    </div>
  );
}
