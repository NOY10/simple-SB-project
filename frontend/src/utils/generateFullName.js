const generateFullName = (...args) => {
  let fullName = '';

  args.forEach((name) => {
    if (name) {
      fullName += `${name} `;
    }
  });

  return fullName.trim();
};

export default generateFullName;
