import { useEffect, useState } from 'react';

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState({ ip: '192.168.0.101', hostname: 'localhost', podname: 'application' });

  useEffect(() => {
    // Fetch the system info from your backend or use a build-time environment variable
    // For demonstration, let's assume it's fetched from a backend API
    fetch('/api/system-info')
      .then(response => response.json())
      .then(data => setSystemInfo(data))
      .catch(error => console.error('Error fetching system info:', error));
  }, []);

  const ip = import.meta.env.VITE_IP;
  const hostname = import.meta.env.VITE_HOSTNAME;
  const podname = import.meta.env.VITE_POD_NAME;

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, padding: '10px', }}>
      <h2>System Info backend application</h2>
      <p>IP: {systemInfo.ip}</p>
      <p>Hostname: {systemInfo.hostname}</p>
      <p>Pod Name: {systemInfo.podname}</p>
      <br />
      <h2>System Info ui application</h2>
      <p>IP: {ip}</p>
      <p>Hostname: {hostname}</p>
      <p>Pod Name: {podname}</p>
    </div>
  );
};

export default SystemInfo;
