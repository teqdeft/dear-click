// get user post duration
export const getPostDuration = (createdAt: string | Date): string => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const diffMs = now.getTime() - postDate.getTime(); // Difference in milliseconds

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  return `${years} year${years > 1 ? 's' : ''} ago`;
};

// get user media extension
export const getMediaType = (url: string) => {
  const ext = url.split('.').pop()?.toLowerCase();
  if (!ext) return 'unknown';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
  if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) return 'video';
  return 'unknown';
};

// count user post, followers, following
export function formatCount(input?: number | null, decimals = 2): string {
  if (input == null || Number.isNaN(input)) return '0';

  const sign = input < 0 ? '-' : '';
  const num = Math.abs(input);

  const truncate = (value: number) => {
    const factor = Math.pow(10, decimals);
    const truncated = Math.floor(value * factor) / factor;
    return truncated.toString().replace(/\.0+$|(\.\d*[1-9])0+$/, '$1');
  };

  if (num >= 1_000_000_000) return `${sign}${truncate(num / 1_000_000_000)}b`;
  if (num >= 1_000_000) return `${sign}${truncate(num / 1_000_000)}m`;
  if (num >= 1_000) return `${sign}${truncate(num / 1_000)}k`;
  return `${sign}${num}`;
}
