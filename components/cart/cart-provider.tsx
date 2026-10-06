"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type CartItemInput = {
  id: string;
  slug: string;
  name: string;
  price_cents: number | null;
  currency: string;
  image?: {
    url: string;
    alt: string | null;
  } | null;
};

export type CartItem = CartItemInput & {
  quantity: number;
};

type CartContextValue = {
  addItem: (item: CartItemInput) => void;
  closeCart: () => void;
  itemCount: number;
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  removeItem: (id: string) => void;
  setItemQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback((item: CartItemInput) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((currentItem) => currentItem.id === item.id);

      if (existingItem) {
        return currentItems.map((currentItem) =>
          currentItem.id === item.id
            ? { ...currentItem, quantity: currentItem.quantity + 1 }
            : currentItem,
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const setItemQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }, [removeItem]);

  const value = useMemo<CartContextValue>(
    () => ({
      addItem,
      closeCart: () => setIsCartOpen(false),
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      items,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      removeItem,
      setItemQuantity,
    }),
    [addItem, isCartOpen, items, removeItem, setItemQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
