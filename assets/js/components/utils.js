export function show(valInfo) {
  return valInfo === 'N/A' ? valInfo : parseFloat(valInfo).toFixed(4);
}