import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useYouTubeVideos } from '../hooks/usePodcastData';
import { ArrowLeft, Calendar, User, Eye } from 'lucide-react';

const VideoDetail = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { data: video, isLoading, error } = useYouTubeVideo(videoId);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
        <p>Chargement de la vidéo...</p>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Vidéo non trouvée</h2>
        <p className="mb-8">La vidéo que vous recherchez n'existe pas ou n'est plus disponible.</p>
        <Link to="/episodes" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour aux épisodes
        </Link>
      </div>
    );
  }

  // Formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 mt-20">
      <Link to="/episodes" className="inline-flex items-center mb-8 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Retour aux épisodes
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">{video.title}</h1>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(video.publishedAt)}
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          {video.author}
        </div>
        {video.viewCount && (
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {parseInt(video.viewCount).toLocaleString('fr-FR')} vues
          </div>
        )}
      </div>
      
      <div className="bg-black rounded-xl overflow-hidden mb-8 shadow-xl">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full"
        ></iframe>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <div 
          className="prose prose-blue max-w-none whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: video.description.replace(/\n/g, '<br>') }}
        />
      </div>
    </div>
  );
};

export default VideoDetail; 