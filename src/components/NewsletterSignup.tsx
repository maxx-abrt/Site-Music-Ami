import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    // Simulate an API call to subscribe to the newsletter
    try {
      // Replace this with your actual subscription logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">On reste en lien ?</h2>
      <p className="text-gray-600 mb-4">
        Abonnez-vous à notre newsletter pour être informé des nouveaux épisodes et des événements à venir.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow px-4 py-3 rounded-lg focus:outline-none text-gray-900"
          required
        />
        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'En cours...' : 'S\'abonner'}
        </button>
      </form>
      {status === 'success' && <p className="text-green-600 mt-2">Merci pour votre abonnement !</p>}
      {status === 'error' && <p className="text-red-600 mt-2">Une erreur est survenue. Veuillez réessayer.</p>}
    </div>
  );
};

export default NewsletterSignup;