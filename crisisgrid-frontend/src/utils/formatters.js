/**
 * Format ISO datetime string to localized command-center format
 */
export function formatDateTime(isoString) {
  if (!isoString) return '—';
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  } catch {
    return isoString;
  }
}

/**
 * Format relative time (e.g. '2m ago', '1h ago')
 */
export function formatRelativeTime(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  } catch {
    return '';
  }
}

/**
 * Classify priority score for visual styling
 */
export function getPriorityMeta(score) {
  const safeScore = Number(score) || 0;
  if (safeScore >= 80) {
    return {
      level: 'CRITICAL',
      color: 'rose',
      textColor: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      barColor: 'from-orange-500 to-rose-600',
      pulse: true,
    };
  }
  if (safeScore >= 60) {
    return {
      level: 'HIGH',
      color: 'orange',
      textColor: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      barColor: 'from-amber-500 to-orange-600',
      pulse: false,
    };
  }
  if (safeScore >= 40) {
    return {
      level: 'MEDIUM',
      color: 'amber',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      barColor: 'from-yellow-500 to-amber-600',
      pulse: false,
    };
  }
  return {
    level: 'LOW',
    color: 'emerald',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    barColor: 'from-emerald-400 to-teal-500',
    pulse: false,
  };
}
