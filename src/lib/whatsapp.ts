'use client';

const DEFAULT_NUMBER = '923077898899';
const STORAGE_KEY = 'whatsappSettings';

interface WhatsAppSettings {
  number: string;
  greetingMessage: string;
  orderUpdateTemplate: string;
}

const defaultSettings: WhatsAppSettings = {
  number: DEFAULT_NUMBER,
  greetingMessage: 'Hi! I have a question about your herbal hair products.',
  orderUpdateTemplate: '🌿 *Order Update - {orderNumber}*\n\nHi {customerName},\n\nYour order status has been updated to: *{status}*\n{trackingInfo}\nThank you for choosing HerbalHairOil! 🌿',
};

export function getWhatsAppSettings(): WhatsAppSettings {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultSettings, ...parsed };
    }
  } catch {
    // ignore parse errors
  }
  return defaultSettings;
}

export function getWhatsAppNumber(): string {
  return getWhatsAppSettings().number;
}

export function getGreetingMessage(): string {
  return getWhatsAppSettings().greetingMessage;
}

export function saveWhatsAppSettings(settings: Partial<WhatsAppSettings>): void {
  if (typeof window === 'undefined') return;
  const current = getWhatsAppSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getWhatsAppUrl(message?: string): string {
  const number = getWhatsAppNumber();
  const cleanNumber = number.replace(/[^0-9]/g, '');
  const base = `https://wa.me/${cleanNumber}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

interface OrderInfo {
  orderNumber: string;
  customerName: string;
  orderStatus: string;
  trackingId?: string;
  totalAmount?: number;
}

export function getOrderStatusMessage(order: OrderInfo): string {
  const template = getWhatsAppSettings().orderUpdateTemplate;
  const trackingInfo = order.trackingId ? `Tracking ID: ${order.trackingId}` : '';
  return template
    .replace(/{orderNumber}/g, order.orderNumber)
    .replace(/{customerName}/g, order.customerName)
    .replace(/{status}/g, order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1))
    .replace(/{trackingInfo}/g, trackingInfo)
    .replace(/{totalAmount}/g, order.totalAmount?.toLocaleString() || '');
}

// Public facing order placement message (used on the order page)
export function getNewOrderMessage(order: {
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
}): string {
  const itemList = order.items
    .map((i) => `${i.name} x${i.quantity} = Rs.${(i.price * i.quantity).toLocaleString()}`)
    .join('\n');

  return `🌿 *New Order*\nName: ${order.customerName}\nPhone: ${order.customerPhone}\nCity: ${order.city}\nAddress: ${order.address}\n\n*Items:*\n${itemList}\n\n*Total: Rs.${order.totalAmount.toLocaleString()}*`;
}
