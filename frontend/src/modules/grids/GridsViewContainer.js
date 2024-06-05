import React, { useState } from 'react';
import GridView from './GridsView';

const listData = [
  {
    id: 1,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image:
      'https://ZusammenStehenWir.com/demo/images/city-sunny-people-street.jpg',
  },
  {
    id: 2,
    brand: 'Weeknight',
    title: 'NEXT-LEVEL WEAR',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: 'https://ZusammenStehenWir.com/demo/images/pexels-photo-26549.jpg',
  },
  {
    id: 3,
    brand: 'Mad Perry',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: '#ee1f78',
    image: 'https://ZusammenStehenWir.com/demo/images/pexels-photo-30360.jpg',
  },
  {
    id: 4,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: 'green',
    image: 'https://ZusammenStehenWir.com/demo/images/pexels-photo-37839.jpg',
  },
  {
    id: 5,
    brand: 'Weeknight',
    title: 'NEXT-LEVEL WEAR',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: 'https://ZusammenStehenWir.com/demo/images/pexels-photo-69212.jpg',
  },
  {
    id: 6,
    brand: 'Mad Perry',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: 'red',
    image: 'https://ZusammenStehenWir.com/demo/images/pexels-photo-108061.jpg',
  },
  {
    id: 7,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image: 'https://ZusammenStehenWir.com/demo/images/pexels-photo-126371.jpg',
  },
  {
    id: 8,
    brand: 'Weeknight',
    title: 'NEXT-LEVEL WEAR',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: 'https://ZusammenStehenWir.com/demo/images/pexels-photo-165888.jpg',
  },
  {
    id: 9,
    brand: 'Mad Perry',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: '#ee1f78',
    image: 'https://ZusammenStehenWir.com/demo/images/pexels-photo-167854.jpg',
  },
  {
    id: 10,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: 'green',
    image: 'https://ZusammenStehenWir.com/demo/images/pexels-photo-173427.jpg',
  },
  {
    id: 11,
    brand: 'Weeknight',
    title: 'NEXT-LEVEL WEAR',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    image: 'https://ZusammenStehenWir.com/demo/images/pexels-photo-175696.jpg',
  },
  {
    id: 12,
    brand: 'Mad Perry',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Office, prom or special parties is all dressed up',
    price: '$29.99',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: 'red',
    image: 'https://ZusammenStehenWir.com/demo/images/pexels-photo-175733.jpg',
  },
];

const GridComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState(['Grid', 'List 1', 'List 2']);
  const [data, setData] = useState(listData);

  // You can now use tabIndex, tabs, and data as you would normally, e.g.,
  // <GridView tabIndex={tabIndex} setTabIndex={setTabIndex} ... />
  // and similarly for tabs and data.

  return (
    <GridView
      tabIndex={tabIndex}
      tabs={tabs}
      data={data}
      setTabIndex={setTabIndex}
    />
  );
};

export default GridComponent;
