export const getSystemInfo = () => {
  const userAgent = window.navigator.userAgent;
  let deviceName = 'Computer';

  // Detect OS and device
  if (userAgent.includes('Mac')) {
    deviceName = 'MacBook';
    if (userAgent.includes('iPhone')) deviceName = 'iPhone';
    if (userAgent.includes('iPad')) deviceName = 'iPad';
  } else if (userAgent.includes('Windows')) {
    deviceName = 'PC';
  } else if (userAgent.includes('Linux')) {
    deviceName = 'Linux';
  } else if (userAgent.includes('Android')) {
    deviceName = 'Android';
  }

  return {
    deviceName,
    username: localStorage.getItem('terminal_username') || '',
  };
}; 