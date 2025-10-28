import React, { useState } from 'react';

export default function ReportPage() {
  const [form, setForm] = useState({
    type: '',
    description: '',
    contact: ''
  });
  const [submitted, setSubmitted] = useState(false);

  async function submitReport(e) {
    e.preventDefault();
    await fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setSubmitted(true);
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛡️ گزارش امنیتی یا رفتاری</h1>
      {submitted ? (
        <p>گزارش شما با موفقیت ارسال شد. تیم بررسی در کمتر از 72 ساعت پاسخ خواهد داد.</p>
      ) : (
        <form onSubmit={submitReport}>
          <label>نوع گزارش:</label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            required
          >
            <option value="">انتخاب کنید</option>
            <option value="security">امنیتی</option>
            <option value="conduct">رفتاری</option>
          </select>
          <br />
          <label>شرح گزارش:</label>
          <textarea
            placeholder="شرح کامل مشکل یا رفتار مشاهده‌شده"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            required
          />
          <br />
          <label>اطلاعات تماس (اختیاری):</label>
          <input
            type="text"
            placeholder="ایمیل یا آیدی"
            value={form.contact}
            onChange={e => setForm({ ...form, contact: e.target.value })}
          />
          <br />
          <button type="submit">ارسال گزارش</button>
        </form>
      )}
    </div>
  );
}