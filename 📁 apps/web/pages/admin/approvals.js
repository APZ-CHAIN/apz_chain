import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Approvals() {
  const [language, setLanguage] = useState('fa');
  const [slug, setSlug] = useState('school');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`/docs/${language}/${slug}/pending`)
      .then(res => res.ok ? res.text() : '')
      .then(setContent);
  }, [language, slug]);

  async function approve() {
    await fetch(`/docs/${language}/${slug}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ editor: 'admin' })
    });
    setStatus('✅ تأیید شد');
  }

  async function reject() {
    await fetch(`/docs/${language}/${slug}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ editor: 'admin' })
    });
    setStatus('❌ رد شد');
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>تأیید ترجمه‌ها</h1>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="fa">فارسی</option>
        <option value="en">English</option>
        <option value="ku">کوردی</option>
      </select>
      <input value={slug} onChange={e => setSlug(e.target.value)} />
      <ReactMarkdown>{content}</ReactMarkdown>
      <button onClick={approve}>✅ تأیید</button>
      <button onClick={reject}>❌ رد</button>
      {status && <p>{status}</p>}
    </div>
  );
}