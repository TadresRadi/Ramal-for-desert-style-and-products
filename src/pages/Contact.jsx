import { useState } from 'react';
import useInView from '../hooks/useInView';
import useLangStore from '../store/langStore';

export default function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLangStore();

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setForm({ name: '', email: '', subject: '', message: '' }); setTimeout(() => setSubmitted(false), 5000); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const contactInfo = [
    { icon: '📍', title: t.contact.visit, lines: t.contact.info.addressLines },
    { icon: '📧', title: t.contact.email, lines: ['hello@rimal.com', 'support@rimal.com'] },
    { icon: '📞', title: t.contact.call, lines: t.contact.info.hoursLines },
  ];

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-14 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-desert-500 font-medium text-sm tracking-widest uppercase">{t.contact.label}</span>
          <h1 className="section-heading mt-3">{t.contact.title}</h1>
          <p className="section-subheading mx-auto mt-4">{t.contact.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info) => (
            <div key={info.title} className="card p-6 text-center">
              <span className="text-3xl mb-3 block">{info.icon}</span>
              <h3 className="font-display font-semibold text-dune-900 dark:text-sand-100 mb-2">{info.title}</h3>
              {info.lines.map((line) => <p key={line} className="text-sm text-dune-600 dark:text-sand-400">{line}</p>)}
            </div>
          ))}
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="card p-8">
            {submitted ? (
              <div className="text-center py-8 animate-scale-in">
                <span className="text-5xl mb-4 block">✉️</span>
                <h3 className="font-display text-xl font-bold text-dune-900 dark:text-sand-100 mb-2">{t.contact.success.title}</h3>
                <p className="text-dune-600 dark:text-sand-400">{t.contact.success.subtitle}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-dune-800 dark:text-sand-200 mb-2">{t.contact.form.name}</label>
                    <input type="text" id="contact-name" name="name" value={form.name} onChange={handleChange} required className="input-field" placeholder={t.contact.form.namePlaceholder} />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-dune-800 dark:text-sand-200 mb-2">{t.contact.form.email}</label>
                    <input type="email" id="contact-email" name="email" value={form.email} onChange={handleChange} required className="input-field" placeholder={t.contact.form.emailPlaceholder} />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-dune-800 dark:text-sand-200 mb-2">{t.contact.form.subject}</label>
                  <input type="text" id="contact-subject" name="subject" value={form.subject} onChange={handleChange} required className="input-field" placeholder={t.contact.form.subjectPlaceholder} />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-dune-800 dark:text-sand-200 mb-2">{t.contact.form.message}</label>
                  <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required rows={5} className="input-field resize-none" placeholder={t.contact.form.messagePlaceholder} />
                </div>
                <button type="submit" id="contact-submit" className="btn-primary w-full text-base py-3.5">{t.contact.form.send}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
