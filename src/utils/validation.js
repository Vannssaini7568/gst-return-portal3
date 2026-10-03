export const validateGSTIN = (v) =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(
    String(v || '')
      .trim()
      .toUpperCase()
  );

export const validateFile = (f) => {
  if (!f) {
    return {
      valid: false,
      error: 'Please select a file',
    };
  }

  const ext = f.name.split('.').pop().toLowerCase();

  if (!['json', 'csv', 'xlsx', 'xls'].includes(ext)) {
    return {
      valid: false,
      error: 'Unsupported file type. Use JSON, CSV, XLSX or XLS.',
    };
  }

  if (f.size > 10 * 1024 * 1024) {
    return {
      valid: false,
      error: 'File size must be 10 MB or less.',
    };
  }

  return {
    valid: true,
  };
};

export const validateRequiredFields = (o) =>
  Object.entries(o)
    .filter(([, v]) => !String(v || '').trim())
    .map(([k]) => k);

export const validateReturnForm = (f, file) => {
  const e = {};

  if (!f.gstin) {
    e.gstin = 'GSTIN is required';
  } else if (!validateGSTIN(f.gstin)) {
    e.gstin = 'Invalid GSTIN format';
  }

  if (!f.returnType) {
    e.returnType = 'Return type is required';
  }
  
  if (!f.financialYear) {
    e.financialYear = 'Financial year is required';
  }

  if (!f.taxPeriod) {
    e.taxPeriod = 'Tax period is required';
  }

  const vf = validateFile(file);

  if (vf.error) {
    e.file = vf.error;
  }

  return e;
};