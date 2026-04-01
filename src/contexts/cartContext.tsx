"use client"

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import apiServices from "../../services/api";
import { useSession } from "next-auth/react";

export const cartContext = createContext<{
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  refreshCart: () => void;
}>({
  cartCount: 0,
  setCartCount: () => {},
  isLoading: true,
  refreshCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const token = session?.user?.token;

  const refreshCart = useCallback(async () => {
    if (!token) {
      setCartCount(0);
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiServices.getCart(token);
      setCartCount(response.numOfCartItems ?? 0);
    } catch {
      setCartCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Only run when token changes (fixes the infinite render loop)
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <cartContext.Provider value={{ cartCount, setCartCount, isLoading, refreshCart }}>
      {children}
    </cartContext.Provider>
  );
}