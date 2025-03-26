import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Désactiver temporairement les web vitals pour éviter les erreurs
    console.info('Web Vitals: métriques désactivées en développement');
    
    // Version sécurisée qui ne provoque pas d'erreur
    const mockMetric = {
      name: 'mock-metric',
      value: 0,
      delta: 0,
      id: 'mock-id',
      entries: []
    };
    
    // Simuler un rapport de métrique pour éviter les erreurs
    setTimeout(() => {
      onPerfEntry(mockMetric);
    }, 100);
    
    // Note: En production, nous pourrions réactiver ceci
    if (process.env.NODE_ENV === 'production') {
      try {
        import('web-vitals')
          .then(webVitals => {
            if (webVitals && typeof webVitals.getCLS === 'function') {
              webVitals.getCLS(onPerfEntry);
              webVitals.getFID(onPerfEntry);
              webVitals.getFCP(onPerfEntry);
              webVitals.getLCP(onPerfEntry);
              webVitals.getTTFB(onPerfEntry);
            }
          })
          .catch(err => {
            console.warn('Impossible de charger web-vitals:', err);
          });
      } catch (error) {
        console.warn('Erreur lors du reporting des métriques web vitals:', error);
      }
    }
  }
};

export default reportWebVitals; 