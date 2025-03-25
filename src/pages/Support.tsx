import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, DollarSign, Coffee, Gift, Award, Zap, CreditCard, Check, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Support = () => {
  const [donationAmount, setDonationAmount] = useState<number | null>(5);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value);
      setDonationAmount(null);
    }
  };
  
  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = donationAmount || (customAmount ? parseFloat(customAmount) : 0);
    if (amount <= 0 || !donorEmail) return;
    
    setIsProcessing(true);
    
    // Simuler un traitement de paiement
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDonationComplete(true);
    } catch (error) {
      console.error('Erreur de paiement:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Liste des sponsors
  const sponsors = [
    { name: "Studio Harmonie", logo: "/images/sponsors/sponsor1.png", tier: "platinum" },
    { name: "SoundWave Records", logo: "/images/sponsors/sponsor2.png", tier: "gold" },
    { name: "MusicTech", logo: "/images/sponsors/sponsor3.png", tier: "silver" }
  ];
  
  // Avantages par niveau de soutien
  const supportTiers = [
    {
      name: "Fan",
      amount: 5,
      icon: <Coffee className="h-8 w-8 text-amber-500" />,
      color: "amber",
      benefits: [
        "Accès à notre newsletter exclusive",
        "Votre nom dans les crédits du podcast",
        "Badge supporter sur notre Discord"
      ]
    },
    {
      name: "Supporter",
      amount: 10,
      icon: <Gift className="h-8 w-8 text-emerald-500" />,
      color: "emerald",
      benefits: [
        "Tous les avantages Fan",
        "Accès anticipé aux épisodes",
        "Contenu bonus exclusif",
        "Participation aux sondages de contenu"
      ]
    },
    {
      name: "Mécène",
      amount: 25,
      icon: <Award className="h-8 w-8 text-purple-500" />,
      color: "purple",
      benefits: [
        "Tous les avantages Supporter",
        "Mention spéciale en début d'épisode",
        "Accès à notre groupe privé",
        "Possibilité de suggérer des sujets d'épisodes",
        "Goodies exclusifs (stickers, badges)"
      ]
    }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <Heart className="h-16 w-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Soutenez MusicAmi</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Votre soutien nous permet de continuer à créer du contenu de qualité et de rester indépendants
        </p>
      </motion.div>

      {/* Section des remerciements */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center shadow-sm border border-blue-100">
          <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Merci à nos auditeurs</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nous tenons à remercier chaleureusement tous nos auditeurs fidèles qui nous suivent chaque semaine. 
            Votre soutien et vos retours nous permettent de continuer à créer du contenu qui vous passionne.
          </p>
        </div>
      </motion.section>

      {/* Section des sponsors actuels */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos sponsors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`bg-white rounded-xl shadow-md p-6 text-center border-t-4 ${
                sponsor.tier === 'platinum' ? 'border-blue-500' : 
                sponsor.tier === 'gold' ? 'border-amber-500' : 'border-gray-400'
              }`}
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder-logo.png';
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{sponsor.name}</h3>
              <p className={`text-sm font-medium ${
                sponsor.tier === 'platinum' ? 'text-blue-600' : 
                sponsor.tier === 'gold' ? 'text-amber-600' : 'text-gray-500'
              }`}>
                {sponsor.tier === 'platinum' ? 'Sponsor Platinum' : 
                 sponsor.tier === 'gold' ? 'Sponsor Gold' : 'Sponsor Silver'}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Section des niveaux de soutien */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Niveaux de soutien</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`bg-${tier.color}-50 p-6 text-center`}>
                {tier.icon}
                <h3 className="text-2xl font-bold text-gray-900 mt-4">{tier.name}</h3>
                <div className="text-3xl font-bold mt-2 mb-2">
                  {tier.amount}€ <span className="text-sm font-normal text-gray-600">/ mois</span>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setDonationAmount(tier.amount)}
                  className="mt-6 w-full py-3 rounded-lg font-medium transition-colors duration-300 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Choisir ce niveau
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Section de don */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-20"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Faire un don</h2>
              <p className="text-blue-100 mb-8">
                Votre soutien financier nous aide à améliorer la qualité de nos épisodes, 
                à investir dans du meilleur équipement et à développer de nouveaux formats.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <DollarSign className="h-6 w-6 text-blue-200 mr-3" />
                  <span className="text-blue-100">100% des dons sont investis dans le podcast</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-6 w-6 text-blue-200 mr-3" />
                  <span className="text-blue-100">Paiement sécurisé et transparent</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-blue-200 mr-3" />
                  <span className="text-blue-100">Remerciement personnalisé dans notre prochain épisode</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 lg:p-12">
              {donationComplete ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Merci pour votre soutien !</h3>
                  <p className="text-gray-600 mb-8">
                    Votre don nous aide à continuer notre mission de partager notre passion pour la musique.
                  </p>
                  <button
                    onClick={() => setDonationComplete(false)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                  >
                    Faire un autre don
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleDonationSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Choisissez un montant</h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[5, 10, 25].map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setDonationAmount(amount);
                          setCustomAmount('');
                        }}
                        className={`py-3 rounded-lg font-medium transition-colors duration-300 ${
                          donationAmount === amount 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {amount}€
                      </button>
                    ))}
                  </div>
                  
                  <div>
                    <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
                      Montant personnalisé
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">€</span>
                      <input
                        type="text"
                        id="customAmount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="Autre montant"
                        className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                          donationAmount === null && customAmount 
                            ? 'border-blue-300 ring-2 ring-blue-100' 
                            : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-2">
                      Votre nom (optionnel)
                    </label>
                    <input
                      type="text"
                      id="donorName"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Comment souhaitez-vous être mentionné ?"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="donorEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Votre email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="donorEmail"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="Pour vous envoyer un reçu"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isProcessing || (!donationAmount && !customAmount) || !donorEmail}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Faire un don {donationAmount || (customAmount && parseFloat(customAmount) > 0) ? `de ${donationAmount || customAmount}€` : ''}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section de contact pour le sponsoring */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-200"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Devenir sponsor</h2>
          <p className="text-gray-600 mb-8 text-center">
            Vous souhaitez associer votre marque à notre podcast et toucher notre audience engagée ?
            Découvrez nos offres de partenariat adaptées à tous les budgets.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="/assets/MusicAmi-MediaKit.pdf" 
              target="_blank"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              Télécharger notre média kit
            </a>
            <Link 
              to="/contact?subject=Sponsoring" 
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Nous contacter pour un partenariat
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Support;
