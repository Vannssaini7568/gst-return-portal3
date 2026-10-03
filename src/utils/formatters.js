export const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '-';

export const formatBytes = (b) =>
  b < 1024 ? `${b} B` : `${(b / 1024 / 1024).toFixed(2)} MB`;