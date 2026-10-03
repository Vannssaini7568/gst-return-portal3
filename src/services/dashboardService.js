import { get, KEYS } from '../utils/localStorage';

export const getDashboardStats = () => {
  const r = get(KEYS.returns, []);

  return {
    total: r.length,
    successful: r.filter((x) => x.status === 'Successful').length,
    pending: r.filter(
      (x) => x.status === 'Pending' || x.status === 'Processing'
    ).length,
    failed: r.filter((x) => x.status === 'Failed').length,
  };
};