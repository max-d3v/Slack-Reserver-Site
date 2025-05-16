import { clsx, type ClassValue } from "clsx"
import Stripe from "stripe";
import { twMerge } from "tailwind-merge"

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function makeTitle(slug: string) {
  var words = slug.split('-');

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