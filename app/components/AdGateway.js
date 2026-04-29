import GameSeoArticle from './GameSeoArticle';
import { seoData } from '../data/seoData';

export default function AdGateway({ children, gameName }) {
  const seo = gameName ? seoData[gameName] : null;

  return (
    <>
      {children}
      {seo && <GameSeoArticle {...seo} />}
    </>
  );
}
