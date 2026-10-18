import React from 'react';
import productsData from '../../../data/products.json';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return <ProductDetailClient slug={params.slug} />;
}
