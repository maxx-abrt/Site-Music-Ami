import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const CGV = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <FileText className="h-16 w-16 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Conditions Générales de Vente</h1>
        <p className="text-xl text-gray-600">
          Applicables à compter du 1er Avril 2025
        </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Article 1 - Objet et champ d'application</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Les présentes Conditions Générales de Vente (CGV) déterminent les droits et obligations des parties dans le cadre des services proposés par Musicami Podcast, entreprise individuelle représentée par Camille PERUTA, immatriculée sous le numéro SIRET 942 543 513 00016, dont le siège social est situé au 28 Bis CHEMIN des bicquey, 25000 Besançon, FRANCE.
          </p>
          <p>
            Les présentes CGV s'appliquent à toutes les ventes de services réalisées par Musicami Podcast auprès de ses clients, quelles que soient les clauses pouvant figurer sur les documents du client.
          </p>
          <p>
            Toute commande de services implique l'acceptation sans réserve par le client des présentes CGV.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Article 2 - Services proposés</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Musicami Podcast propose les services suivants :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Production de contenus audio et vidéo</li>
            <li>Création et diffusion de podcasts</li>
            <li>Services de conseil en communication</li>
            <li>Prestations d'animation et d'interviews</li>
            <li>Vente de produits dérivés liés au podcast</li>
          </ul>
          <p>
            Les caractéristiques principales des services sont présentées sur le site internet www.musicamipodcast.fr ou font l'objet d'une description détaillée lors de l'établissement d'un devis personnalisé.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Article 3 - Prix et modalités de paiement</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Les prix des services sont indiqués en euros et sont nets de TVA (TVA non applicable, article 293 B du CGI).
          </p>
          <p>
            Musicami Podcast se réserve le droit de modifier ses prix à tout moment, mais les services seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
          </p>
          <p>
            Le paiement peut être effectué par virement bancaire, par carte bancaire via une plateforme sécurisée, ou par tout autre moyen indiqué sur le site ou le devis.
          </p>
          <p>
            Un acompte de 30% du montant total peut être demandé à la commande pour certaines prestations, le solde étant payable à la livraison ou selon les modalités précisées dans le devis.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Article 4 - Délais d'exécution</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Les délais d'exécution des services sont indiqués lors de la commande ou sur le devis. Musicami Podcast s'engage à respecter ces délais dans la mesure du possible.
          </p>
          <p>
            En cas de retard, Musicami Podcast s'engage à en informer le client dans les meilleurs délais. Le retard ne pourra pas donner lieu à des dommages et intérêts au profit du client.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Article 5 - Droit de rétractation</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Conformément aux dispositions légales en vigueur, le client dispose d'un délai de 14 jours à compter de la conclusion du contrat pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
          </p>
          <p>
            Pour exercer ce droit, le client doit notifier sa décision de rétractation par écrit à Musicami Podcast, par email à contact@musicamipodcast.fr ou par courrier à l'adresse du siège social.
          </p>
          <p>
            En cas de rétractation, Musicami Podcast remboursera tous les paiements reçus dans un délai de 14 jours à compter de la réception de la notification de rétractation.
          </p>
          <p>
            Le droit de rétractation ne s'applique pas aux services pleinement exécutés avant la fin du délai de rétractation et dont l'exécution a commencé après accord préalable exprès du client et renoncement exprès à son droit de rétractation.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Article 6 - Propriété intellectuelle</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Tous les éléments créés par Musicami Podcast dans le cadre des prestations restent la propriété exclusive de Musicami Podcast jusqu'au paiement intégral du prix.
          </p>
          <p>
            Après paiement intégral, et sauf mention contraire dans le contrat, le client obtient une licence d'utilisation des créations pour les usages définis dans le contrat.
          </p>
          <p>
            Toute utilisation non prévue dans le contrat initial devra faire l'objet d'une autorisation écrite de Musicami Podcast et pourra donner lieu à une facturation supplémentaire.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Article 7 - Responsabilité</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Musicami Podcast s'engage à exécuter ses prestations avec soin et diligence.
          </p>
          <p>
            La responsabilité de Musicami Podcast ne pourra être engagée qu'en cas de faute prouvée et sera limitée aux préjudices directs subis par le client, à l'exclusion de tout préjudice indirect.
          </p>
          <p>
            En tout état de cause, la responsabilité de Musicami Podcast est plafonnée au montant des sommes effectivement versées par le client.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Article 8 - Loi applicable et juridiction compétente</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Les présentes CGV sont soumises au droit français.
          </p>
          <p>
            En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire.
          </p>
          <p>
            À défaut d'accord amiable, tout litige relatif à l'interprétation ou l'exécution des présentes CGV sera de la compétence exclusive des tribunaux de Besançon, même en cas de référé, d'appel en garantie ou de pluralité de défendeurs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CGV;