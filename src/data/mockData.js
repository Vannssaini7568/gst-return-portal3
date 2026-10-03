export const mockGSTINs = [
  {
    id: 'g1',
    gstin: '08ABCDE1234F1Z5',
    businessName: 'ABC Enterprises',
    tradeName: 'ABC Enterprises',
    state: 'Rajasthan',
    status: 'Active',
    addedDate: '2026-01-12',
  },
  {
    id: 'g2',
    gstin: '08SHARM5678G2Z6',
    businessName: 'Sharma Traders',
    tradeName: 'Sharma Traders',
    state: 'Rajasthan',
    status: 'Active',
    addedDate: '2026-02-03',
  },
  {
    id: 'g3',
    gstin: '08RAJAS9012H3Z7',
    businessName: 'Rajasthan Textiles',
    tradeName: 'Rajasthan Textiles',
    state: 'Rajasthan',
    status: 'Active',
    addedDate: '2026-02-18',
  },
  {
    id: 'g4',
    gstin: '08XYZIN3456J4Z8',
    businessName: 'XYZ Industries',
    tradeName: 'XYZ Industries',
    state: 'Gujarat',
    status: 'Inactive',
    addedDate: '2026-03-10',
  },
  {
    id: 'g5',
    gstin: '08JAIPU7890K5Z9',
    businessName: 'Jaipur Auto Parts',
    tradeName: 'Jaipur Auto Parts',
    state: 'Rajasthan',
    status: 'Active',
    addedDate: '2026-04-01',
  },
];

const types = [
  'GSTR-1',
  'GSTR-3B',
  'GSTR-2B',
  'GSTR-4',
  'GSTR-9',
];

const statuses = [
  'Successful',
  'Successful',
  'Successful',
  'Pending',
  'Failed',
  'Successful',
  'Processing',
  'Successful',
  'Pending',
  'Successful',
  'Failed',
  'Successful',
  'Processing',
  'Successful',
  'Pending',
];

const months = [
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'January',
  'February',
  'March',
];

export const mockReturns = Array.from(
  { length: 15 },
  (_, i) => {
    const g = mockGSTINs[i % 5];

    return {
      id: `r${i + 1}`,
      returnId: `RET-2026-${String(124 - i).padStart(6, '0')}`,
      gstin: g.gstin,
      businessName: g.businessName,
      returnType: types[i % 5],
      financialYear:
        i % 3 === 0
          ? '2026-27'
          : i % 3 === 1
            ? '2025-26'
            : '2024-25',
      taxPeriod: months[i % 12],
      fileName: `${types[i % 5].replace(
        '-',
        ''
      )}_${months[i % 12]}_2026.json`,
      fileSize: `${(1.2 + i * 0.17).toFixed(1)} MB`,
      uploadDate: `2026-0${(i % 9) + 1}-${String(
        (i % 27) + 1
      ).padStart(2, '0')}`,
      uploadTime: `${String(9 + (i % 9)).padStart(
        2,
        '0'
      )}:${String(10 + ((i * 3) % 50)).padStart(
        2,
        '0'
      )}`,
      status: statuses[i],
      uploadedBy: 'Admin User',
    };
  }
);

export const mockHistory = mockReturns
  .slice(0, 10)
  .map((r) => ({
    ...r,
    id: `h-${r.id}`,
  }));

export const mockUsers = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@gstportal.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2026-10-01 09:40',
  },
  {
    id: 'u2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2026-09-30 18:22',
  },
  {
    id: 'u3',
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2026-09-29 14:11',
  },
  {
    id: 'u4',
    name: 'Neha Jain',
    email: 'neha@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2026-09-12 10:06',
  },
  {
    id: 'u5',
    name: 'Amit Gupta',
    email: 'amit@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2026-09-28 16:35',
  },
];

export const seed = {
  gstins: mockGSTINs,
  returns: mockReturns,
  history: mockHistory,
  users: mockUsers,
  profile: {
    fullName: 'Admin User',
    email: 'admin@gstportal.com',
    mobile: '+91 98765 43210',
    companyName: 'GST Portal Demo Pvt. Ltd.',
    designation: 'Administrator',
  },
  settings: {
    notifications: {
      upload: true,
      validation: true,
      failed: true,
    },
    dark: false,
  },
};