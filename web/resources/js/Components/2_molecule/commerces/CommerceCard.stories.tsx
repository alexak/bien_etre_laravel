import React from 'react';
import CommerceCard from './CommerceCard';

export default {
  title: "Components/04 Organismes/Commerce Card",
  component: CommerceCard,
  parameters: {
    docs: {
      description: {
        component: 'Card element of the search result / category page',
      },
    },
  },
  argTypes: {
    'serviceProvider.image': { control: 'text', name: 'Image URL' },
    'serviceProvider.isFavorite': { control: 'boolean', name: 'Is Favorite' },
    'serviceProvider.id': { control: 'number', name: 'ID' },
    'serviceProvider.category': { control: 'text', name: 'Category' },
    'serviceProvider.name': { control: 'text', name: 'Name' },
    'serviceProvider.distance': { control: 'number', name: 'Distance' },
    'serviceProvider.price': { control: 'number', name: 'Price' },
    'serviceProvider.rating': { control: 'number', name: 'Rating' },
    'serviceProvider.isAtHome': { control: 'boolean', name: 'Is At Home' },
    'serviceProvider.isAtStore': { control: 'boolean', name: 'Is At Store' },
  }
};


export const Default = ({ 
  serviceProviderImage, 
  serviceProviderIsFavorite, 
  serviceProviderId, 
  serviceProviderCategory, 
  serviceProviderName, 
  serviceProviderDistance, 
  serviceProviderPrice, 
  serviceProviderIsAtHome, 
  serviceProviderIsAtStore,
  serviceProviderRating
}) => {
  const serviceProvider = {
    image: serviceProviderImage,
    isFavorite: serviceProviderIsFavorite,
    id: serviceProviderId,
    category: serviceProviderCategory,
    name: serviceProviderName,
    distance: serviceProviderDistance,
    price: serviceProviderPrice,
    isAtHome: serviceProviderIsAtHome,
    isAtStore: serviceProviderIsAtStore,
    rating: serviceProviderRating
  };
  
  
  return (
    <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
      <CommerceCard serviceProvider={serviceProvider} />
    </div>
  );
};

// Set default values for these props in Default.args
Default.args = {
  serviceProviderImage: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  serviceProviderIsFavorite: false,
  serviceProviderId: 1,
  serviceProviderCategory: 'Example Category',
  serviceProviderName: 'Example Name',
  serviceProviderDistance: 10,
  serviceProviderPrice: 19.99,
  serviceProviderIsAtHome: true,
  serviceProviderIsAtStore: false,
  serviceProviderRating: 4.8,
};
