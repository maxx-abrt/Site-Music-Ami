import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Format d\'email invalide';
    if (!formData.sujet.trim()) newErrors.sujet = 'Le sujet est requis';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur lorsque l'utilisateur commence à corriger
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('submitting');
    
    // Simuler un envoi de formulaire
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
      setFormData({ nom: '', email: '', sujet: '', message: '' });
      
      // Réinitialiser après 5 secondes
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      {/* En-tête de page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <Mail className="h-16 w-16 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Une question, une suggestion ou une proposition de collaboration ? 
          N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
        </p>
      </motion.div>

      {/* Section principale avec carte et formulaire */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
        {/* Informations de contact et carte */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Carte stylisée */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-64 md:h-80">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1651245814279!5m2!1sfr!2sfr" 
              className="w-full h-full border-0" 
              loading="lazy"
              title="Carte de localisation"
            ></iframe>
          </div>
          
          {/* Informations de contact */}
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Nos coordonnées</h3>
            
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Adresse</h4>
                <p className="text-gray-600">123 Avenue de la Musique<br />75001 Paris, France</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Email</h4>
                <p className="text-gray-600">contact@musicami.fr</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Téléphone</h4>
                <p className="text-gray-600">+33 1 23 45 67 89</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Horaires</h4>
                <p className="text-gray-600">Lundi - Vendredi: 9h - 18h</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Formulaire de contact */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Envoyez-nous un message</h3>
            
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
              >
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Message envoyé avec succès !</h4>
                <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais.</p>
              </motion.div>
            ) : formStatus === 'error' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
              >
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Une erreur est survenue</h4>
                <p className="text-gray-600">Veuillez réessayer ultérieurement ou nous contacter par téléphone.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.nom ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="Votre nom"
                    />
                    {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                  <select
                    id="sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.sujet ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="question">Question générale</option>
                    <option value="suggestion">Suggestion d'épisode</option>
                    <option value="collaboration">Proposition de collaboration</option>
                    <option value="technique">Problème technique</option>
                    <option value="autre">Autre</option>
                  </select>
                  {errors.sujet && <p className="mt-1 text-sm text-red-600">{errors.sujet}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    placeholder="Votre message..."
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Section FAQ rapide */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-blue-50 rounded-xl p-8 mb-20"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Questions fréquentes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Quel est le délai de réponse ?</h3>
            <p className="text-gray-600">Nous nous efforçons de répondre à toutes les demandes dans un délai de 48 heures ouvrées.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Comment proposer un sujet d'épisode ?</h3>
            <p className="text-gray-600">Utilisez notre formulaire de contact en sélectionnant "Suggestion d'épisode" comme sujet.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Puis-je être invité au podcast ?</h3>
            <p className="text-gray-600">Bien sûr ! Envoyez-nous une proposition détaillée avec votre expérience et le sujet que vous souhaitez aborder.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Comment signaler un problème technique ?</h3>
            <p className="text-gray-600">Utilisez notre formulaire en sélectionnant "Problème technique" et décrivez précisément l'erreur rencontrée.</p>
          </div>
        </div>
      </motion.section>
      
      {/* Section newsletter */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-10 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Restez informé</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Abonnez-vous à notre newsletter pour être informé des nouveaux épisodes et des événements à venir.
        </p>
        
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="flex-grow px-4 py-3 rounded-lg focus:outline-none text-gray-900"
          />
          <button
            type="submit"
            className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300 whitespace-nowrap"
          >
            S'abonner
          </button>
        </form>
      </motion.section>
    </div>
  );
};

export default Contact;
