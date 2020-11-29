// TODO: Handle `null`.
export const deepMerge = (a, b) => {
  const o = [
    ...Object.keys(a),
    ...Object.keys(b),
  ].reduce((acc, key) => ({ ...acc, [key]: undefined }), {});

  return Object.keys(o)
    .reduce((acc, key) => {
      if (key in a && !(key in b)) return { ...acc, [key]: a[key] };
      if (key in b && !(key in a)) return { ...acc, [key]: b[key] };
      if (typeof b[key] !== 'object') return { ...acc, [key]: b[key] };
      if (Array.isArray(a[key]) && Array.isArray(b[key])) return { ...acc, [key]: [...a[key], ...b[key]] };
      return { ...acc, [key]: deepMerge(a[key], b[key]) };
    }, {});
};
