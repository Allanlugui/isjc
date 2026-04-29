import React from 'react';
import { Devotional } from '../types';
import { Icons } from './Icons';

interface DevotionalCardProps {
  devotional: Devotional;
  loading?: boolean;
}

export const DevotionalCard: React.FC<DevotionalCardProps> = ({ devotional, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto animate-pulse border border-church-100">
        <div className="h-8 bg-church-100 rounded w-3/4 mb-6 mx-auto"></div>
        <div className="h-4 bg-church-50 rounded w-1/2 mb-8 mx-auto"></div>
        <div className="space-y-3">
          <div className="h-4 bg-church-50 rounded w-full"></div>
          <div className="h-4 bg-church-50 rounded w-full"></div>
          <div className="h-4 bg-church-50 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-church-100 max-w-3xl mx-auto transition-all duration-500 hover:shadow-2xl">
      <div className="bg-church-600 p-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <h3 className="text-sm font-medium tracking-widest uppercase opacity-80 mb-2">Devocional do Dia</h3>
        <h2 className="text-2xl md:text-3xl font-serif font-bold relative z-10">{devotional.title}</h2>
      </div>
      
      <div className="p-8 md:p-10">
        <div className="mb-8 text-center">
          <p className="text-xl md:text-2xl font-serif text-church-800 italic leading-relaxed">
            "{devotional.verse}"
          </p>
          <p className="text-church-500 font-medium mt-3">— {devotional.verseReference}</p>
        </div>

        <div className="prose prose-church prose-lg mx-auto text-gray-600 leading-loose">
          <p className="whitespace-pre-line">{devotional.reflection}</p>
        </div>

        <div className="mt-10 bg-church-50 rounded-xl p-6 border border-church-100">
          <h4 className="flex items-center justify-center text-church-700 font-bold mb-3">
            <Icons.Sparkles className="w-5 h-5 mr-2 text-gold-500" />
            Oração
          </h4>
          <p className="text-center text-gray-700 italic">
            "{devotional.prayer}"
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
           <button className="flex items-center px-4 py-2 text-church-600 bg-church-50 hover:bg-church-100 rounded-full text-sm font-medium transition-colors">
              <Icons.Share2 className="w-4 h-4 mr-2" />
              Compartilhar
           </button>
        </div>
      </div>
    </div>
  );
};