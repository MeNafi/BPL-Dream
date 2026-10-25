'use client';

import { useState } from 'react';
import { RotateCcw, Save } from 'lucide-react';
import type { AuthUser } from '@/lib/api-client';
import { useNotify } from './toast-provider';

function Switch({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return <button type="button" role="switch" aria-checked={on} aria-label={label} className={on ? 'switch on' : 'switch'} onClick={onChange} />;
}

export function SettingsPanel({
  user, dark, onToggleDark, demo, onResetDemo,
}: {
  user: AuthUser;
  dark: boolean;
  onToggleDark: () => void;
  demo: boolean;
  onResetDemo: () => void;
}) {
  const notify = useNotify();
  const [name, setName] = useState(user.name ?? '');
  const [prefs, setPrefs] = useState({ email: true, digest: false });

  return (
    <div className="settings-grid">
      <section className="dashboard-card settings-card">
        <span className="eyebrow">Profile</span>
        <h2>Your details</h2>
        <form className="settings-form" onSubmit={(event) => { event.preventDefault(); notify({ message: 'Profile saved.' }); }}>
          <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label>Email address<input value={user.email ?? ''} disabled /></label>
          <label>Role<input value={user.role === 'student' ? 'Student' : 'Mentor'} disabled /></label>
          <div className="settings-actions">
            <button className="button button-dark"><Save size={15} /> Save changes</button>
          </div>
        </form>
      </section>

      <section className="dashboard-card settings-card">
        <span className="eyebrow">Preferences</span>
        <h2>Notifications &amp; appearance</h2>
        <div className="toggle-row">
          <span>Email notifications<small>Get an email when a review is completed</small></span>
          <Switch label="Email notifications" on={prefs.email} onChange={() => setPrefs({ ...prefs, email: !prefs.email })} />
        </div>
        <div className="toggle-row">
          <span>Weekly digest<small>A summary of your submissions every Monday</small></span>
          <Switch label="Weekly digest" on={prefs.digest} onChange={() => setPrefs({ ...prefs, digest: !prefs.digest })} />
        </div>
        <div className="toggle-row">
          <span>Dark mode<small>Easier on the eyes at night</small></span>
          <Switch label="Dark mode" on={dark} onChange={onToggleDark} />
        </div>
        {demo && (
          <div className="demo-reset">
            You’re exploring in demo mode. Changes are saved only in this browser.
            <br />
            <button className="button button-outline button-small" onClick={onResetDemo}><RotateCcw size={13} /> Reset demo data</button>
          </div>
        )}
      </section>
    </div>
  );
}
