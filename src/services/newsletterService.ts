// Interface pour les abonnés à la newsletter
export interface NewsletterSubscriber {
  email: string;
  dateSubscribed: Date;
  active: boolean;
}

// Simuler une base de données locale pour les tests
let subscribers: NewsletterSubscriber[] = [];

/**
 * Ajoute un nouvel abonné à la newsletter
 */
export const subscribeToNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Vérifier si l'email est déjà abonné
    const existingSubscriber = subscribers.find(sub => sub.email === email);
    
    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return { 
          success: false, 
          message: "Cette adresse email est déjà abonnée à notre newsletter." 
        };
      } else {
        // Réactiver l'abonnement
        existingSubscriber.active = true;
        return { 
          success: true, 
          message: "Votre abonnement a été réactivé avec succès." 
        };
      }
    }
    
    // En production, utiliser ici une API comme Mailchimp, SendGrid, etc.
    // Par exemple avec Mailchimp:
    // const response = await axios.post('https://us1.api.mailchimp.com/3.0/lists/{list_id}/members', {
    //   email_address: email,
    //   status: 'subscribed'
    // }, {
    //   headers: {
    //     'Authorization': `apikey ${MAILCHIMP_API_KEY}`
    //   }
    // });
    
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Ajouter le nouvel abonné
    const newSubscriber: NewsletterSubscriber = {
      email,
      dateSubscribed: new Date(),
      active: true
    };
    
    subscribers.push(newSubscriber);
    
    // Enregistrer dans le localStorage pour la persistance
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    
    return { 
      success: true, 
      message: "Merci pour votre inscription ! Vous recevrez bientôt nos actualités." 
    };
  } catch (error) {
    console.error('Erreur lors de l\'abonnement à la newsletter:', error);
    return { 
      success: false, 
      message: "Une erreur est survenue. Veuillez réessayer plus tard." 
    };
  }
};

/**
 * Désabonne un email de la newsletter
 */
export const unsubscribeFromNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const subscriberIndex = subscribers.findIndex(sub => sub.email === email);
    
    if (subscriberIndex === -1) {
      return { 
        success: false, 
        message: "Cette adresse email n'est pas abonnée à notre newsletter." 
      };
    }
    
    // En production, vous utiliseriez ici une API comme Mailchimp, SendGrid, etc.
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Marquer comme inactif plutôt que de supprimer
    subscribers[subscriberIndex].active = false;
    
    // Mettre à jour le localStorage
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    
    return { 
      success: true, 
      message: "Vous avez été désabonné de notre newsletter avec succès." 
    };
  } catch (error) {
    console.error('Erreur lors du désabonnement à la newsletter:', error);
    return { 
      success: false, 
      message: "Une erreur est survenue. Veuillez réessayer plus tard." 
    };
  }
};

// Initialiser les abonnés depuis le localStorage au chargement
try {
  const storedSubscribers = localStorage.getItem('newsletterSubscribers');
  if (storedSubscribers) {
    subscribers = JSON.parse(storedSubscribers);
  }
} catch (error) {
  console.error('Erreur lors de la récupération des abonnés:', error);
} 