import { clsx, type ClassValue } from "clsx"
import Stripe from "stripe";
import { twMerge } from "tailwind-merge"

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function makeTitle(slug: string) {
  var words = slug.split('_');

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizedFirstName(name: string | undefined | null) {
  if (typeof name !== 'string') {
    return name;
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function isStripeProduct(product: any): product is Stripe.Product {
  return product &&
    typeof product === 'object' &&
    'id' in product &&
    'name' in product &&
    typeof product.name === 'string';
}

export function includesInsensitive(str: string, search: string): boolean {
  return str.toLowerCase().includes(search.toLowerCase());
}


export type ValidPlanFeatures = {
  reservations: number;
  resources: number;
  resource_groups: number;
}

export function validPlanFeatures(features: unknown): features is ValidPlanFeatures {
  if (typeof features !== 'object' || features === null) {
    return false;
  }

  const { reservations, resources, resource_groups } = features as Record<string, unknown>;

  return (
    typeof reservations === 'number' &&
    typeof resources === 'number' &&
    typeof resource_groups === 'number'
  );
}

export function capitalizeName(name: string): string {
  return name.replace(/\b(\w)/g, s => s.toUpperCase());
}

export function dateDisplay(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}