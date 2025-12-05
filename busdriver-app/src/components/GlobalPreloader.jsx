import { useEffect } from 'react';
import NProgress from 'nprogress';
import '../assets/css/nprogress.css';
import { useLoading } from '../context/LoadingContext';

const TopProgressBar = () => {
  const { loading } = useLoading();

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return null; // Ce composant n'affiche rien directement
};

export default TopProgressBar;
