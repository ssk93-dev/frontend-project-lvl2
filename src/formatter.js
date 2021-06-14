const formatDiff = (differences) => {
  const formattedDiff = differences.map((item) => {
    switch (item.type) {
      case 'unchanged':
        return `    ${item.name}: ${item.value}`;
      case 'changed':
        return `  - ${item.name}: ${item.value.oldValue}\n  + ${item.name}: ${item.value.newValue}`;
      case 'added':
        return `  + ${item.name}: ${item.value}`;
      case 'removed':
        return `  - ${item.name}: ${item.value}`;
      default:
        throw new Error(`Type ${item.type} of ${item.name} not recognized`);
    }
  });
  formattedDiff.unshift('{');
  formattedDiff.push('}');
  return formattedDiff.join('\n');
};
export default formatDiff;
