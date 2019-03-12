export const formatTime = (milliseconds) => {
  let time = '';
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;

  if (seconds > 0) time += `${seconds}s`;
  if (minutes > 0) time = `${minutes}m ${time}`;
  if (hours > 0) time = `${hours}h ${time}`;

  return time;
}

export const getColorFromName = (name) => {
  const hexColor = `#${dec2hex(hashName(name))}`;
  return hexColor;
}

const hashName = (name) => {
  const maxHexDecimal = 16777215;

  return [...name].reduce((a, b) => {
    return a + Math.pow(b.charCodeAt(0) + 3, 5);
  }, 1) % maxHexDecimal;
}

const dec2hex = (i) => {
  return (i+0x100000).toString(16).substr(-6).toUpperCase();
}