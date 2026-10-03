export function exportCSV(rows, filename = 'export.csv') {
  if (!rows?.length) return;

  const headers = [
    ...new Set(rows.flatMap((r) => Object.keys(r))),
  ];

  const esc = (v) =>
    `"${String(v ?? '').replaceAll('"', '""')}"`;

  const csv = [
    headers.map(esc).join(','),
    ...rows.map((r) =>
      headers.map((h) => esc(r[h])).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
}