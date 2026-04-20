import React from 'react';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover-lift hover:border-secondary-200 hover:bg-secondary-50/40"
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-secondary-50 text-secondary-700 border border-secondary-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {service.category}
          </span>
          <div className="flex items-center text-amber-500 font-medium text-sm bg-amber-50 px-2 py-1 rounded-md">
            <Star size={14} className="fill-current mr-1" />
            {service.rating || 'N/A'}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{service.title}</h3>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2">{service.description}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center bg-gray-50 px-2.5 py-1 rounded-md">
            <MapPin size={14} className="text-gray-400 mr-1.5" />
            Local
          </div>
          <div className="flex items-center bg-gray-50 px-2.5 py-1 rounded-md">
            <Clock size={14} className="text-gray-400 mr-1.5" />
            Instantly
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-50 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between mt-auto">
        <div>
          <span className="text-xs text-gray-500 block">Starting from</span>
          <span className="text-xl font-extrabold text-gray-900">₹{service.price_per_hour}<span className="text-sm font-medium text-gray-500">/hr</span></span>
        </div>
        <button 
          className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg hover:shadow-accent-500/20 focus-visible:outline-2 focus-visible:outline-accent-500"
          onClick={e => { e.stopPropagation(); onClick(service); }}
        >
          View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
