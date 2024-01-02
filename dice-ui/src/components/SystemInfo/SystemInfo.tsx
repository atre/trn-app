import { useEffect, useState } from 'react';

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState({ ip: '', hostname: '', podName: '' });

  useEffect(() => {
    // Fetch the system info from the backend API
    fetch('/api/system-info')
      .then(response => response.json())
      .then(data => {
        if (data && data.data) {
          setSystemInfo(data.data);
        }
      })
      .catch(error => console.error('Error fetching system info:', error));
  }, []);

  const hostname = import.meta.env.VITE_HOSTNAME || 'N/A';
  const podName = import.meta.env.VITE_POD_NAME || 'N/A';

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, padding: '10px' }}>
      <h2>System Info: Backend Application</h2>
      <p>IP: {systemInfo.ip}</p>
      <p>Hostname: {systemInfo.hostname}</p>
      <p>Pod Name: {systemInfo.podName}</p>
      <br />
      <h2>System Info: UI Application</h2>
      <p>Hostname: {hostname}</p>
      <p>Pod Name: {podName}</p>
    </div>
  );
};

export default SystemInfo;
