// src/components/Profile/Notifications.tsx

const Notifications = () => (
  <div className="space-y-4">
    <div className="flex justify-between">
      <span>Email Notifications</span>
      <input aria-label="emailNotification" type="checkbox" className="accent-secondary" defaultChecked />
    </div>
    <div className="flex justify-between">
      <span>Push Notifications</span>
      <input aria-label="notification" type="checkbox" className="accent-secondary" defaultChecked />
    </div>
    <div className="flex justify-between">
      <span>SMS Alerts</span>
      <input aria-label="sms" type="checkbox" className="accent-secondary" />
    </div>
  </div>
);

export default Notifications;
