
import { ResponseType } from "@/types/ResponseType";
import { IProduct } from './../src/interfaces/IProducts';
import { IAddToCartResponse } from "@/interfaces/cart/IAddToCartResponse";
import { ICheckout } from "@/interfaces/Payments/ICheckout ";
import { IShippingAddress } from "@/interfaces/Payments/IShippingAddress";
import { SignInResponse } from "@/types/SignInResponse";
import { ICategory } from "@/interfaces/ICategory";
import { IBrand } from "@/interfaces/IBrand";
import { RegisterResponse } from "@/types/registerResponse";
import { IOrder } from "@/interfaces/IOrder";
import { IWishlistResponse } from "@/interfaces/IWishlist";


class ApiServices {

    #BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    // Build headers — token is optional (passed per call when needed)
    #getHeaders(token?: string) {
        return {
            "content-type": "application/json",
            ...(token ? { token } : {})
        }
    }

    // ─── Products ─────────────────────────────────────────────────────────────

    async getProducts(): Promise<IProduct[]> {
        const response = await fetch(this.#BASE_URL + "/api/v1/products")
        const data: ResponseType<IProduct> = await response.json()
        return data.data;
    }

    async getProductsDetails(productId: string): Promise<IProduct> {
        const response = await fetch(this.#BASE_URL + "/api/v1/products/" + productId)
        const { data: product } = await response.json()
        return product;
    }

    async getProductsByCategory(categoryId: string): Promise<IProduct[]> {
        const response = await fetch(this.#BASE_URL + `/api/v1/products?category=${categoryId}`)
        const data: ResponseType<IProduct> = await response.json()
        return data.data;
    }

    // ─── Cart ─────────────────────────────────────────────────────────────────

    async addProductsToCart(productId: string, token: string): Promise<IAddToCartResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v2/cart", {
            method: "post",
            body: JSON.stringify({ productId }),
            headers: this.#getHeaders(token)
        })
        return response.json();
    }

    async getCart(token: string): Promise<IAddToCartResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v2/cart", {
            headers: this.#getHeaders(token)
        })
        return response.json();
    }

    async deleteProductFromCart(productId: string, token: string): Promise<IAddToCartResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v2/cart/" + productId, {
            method: "delete",
            headers: this.#getHeaders(token)
        })
        return response.json();
    }

    async clearCart(token: string): Promise<any> {
        const response = await fetch(this.#BASE_URL + "/api/v2/cart", {
            method: "delete",
            headers: this.#getHeaders(token)
        })
        return response.json();
    }

    async updateProductCount(productId: string, count: number, token: string): Promise<IAddToCartResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v2/cart/" + productId, {
            method: "put",
            headers: this.#getHeaders(token),
            body: JSON.stringify({ count })
        })
        return response.json();
    }

    // ─── Checkout / Orders ────────────────────────────────────────────────────

    async checkout(cartId: string, token: string) {
        return fetch(
            this.#BASE_URL + "/api/v1/orders/checkout-session/" + cartId + "?url=http://localhost:3000",
            {
                body: JSON.stringify({
                    shippingAddress: { details: "details", phone: "01010700999", city: "Cairo" },
                }),
                headers: this.#getHeaders(token),
                method: "post"
            }
        ).then(res => res.json());
    }

    async checkout_new(cartId: string, shippingAddress: IShippingAddress, token: string): Promise<ICheckout> {
        const response = await fetch(
            this.#BASE_URL + "/api/v1/orders/checkout-session/" + cartId + "?url=http://localhost:3000",
            {
                method: "post",
                headers: this.#getHeaders(token),
                body: JSON.stringify({ shippingAddress }),
            }
        )
        return response.json();
    }

    /** Get all orders for a specific user */
    async getUserOrders(userId: string, token: string): Promise<IOrder[]> {
        const response = await fetch(this.#BASE_URL + "/api/v1/orders/user/" + userId, {
            headers: this.#getHeaders(token)
        })
        const data = await response.json()
        // API returns array directly
        return Array.isArray(data) ? data : data.data ?? [];
    }

    // ─── Categories ───────────────────────────────────────────────────────────

    async getCategories(): Promise<ICategory[]> {
        const response = await fetch(this.#BASE_URL + "/api/v1/categories")
        const data: ResponseType<ICategory> = await response.json()
        return data.data;
    }

    // ─── Brands ───────────────────────────────────────────────────────────────

    async getBrands(): Promise<IBrand[]> {
        const response = await fetch(this.#BASE_URL + "/api/v1/brands")
        const data: ResponseType<IBrand> = await response.json()
        return data.data;
    }

    async getBrandById(brandId: string): Promise<IBrand> {
        const response = await fetch(this.#BASE_URL + "/api/v1/brands/" + brandId)
        const { data } = await response.json()
        return data;
    }

    async getProductsByBrand(brandId: string): Promise<IProduct[]> {
        const response = await fetch(this.#BASE_URL + `/api/v1/products?brand=${brandId}`)
        const data: ResponseType<IProduct> = await response.json()
        return data.data;
    }

    // ─── Auth ─────────────────────────────────────────────────────────────────

    async signIn(email: string, password: string): Promise<SignInResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/auth/signin", {
            method: "post",
            headers: this.#getHeaders(),
            body: JSON.stringify({ email, password })
        })
        return response.json();
    }

    async signUp(name: string, email: string, password: string, rePassword: string, phone: string): Promise<RegisterResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/auth/signup", {
            method: "post",
            headers: this.#getHeaders(),
            body: JSON.stringify({ name, email, password, rePassword, phone })
        })
        return response.json();
    }

    // ─── Wishlist ─────────────────────────────────────────────────────────────

    async getWishlist(token: string): Promise<IWishlistResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/wishlist", {
            headers: this.#getHeaders(token)
        })
        return response.json();
    }

    async addToWishlist(productId: string, token: string): Promise<IWishlistResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/wishlist", {
            method: "post",
            headers: this.#getHeaders(token),
            body: JSON.stringify({ productId })
        })
        return response.json();
    }

    async removeFromWishlist(productId: string, token: string): Promise<IWishlistResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/wishlist/" + productId, {
            method: "delete",
            headers: this.#getHeaders(token)
        })
        return response.json();
    }
    // ─── User Profile ─────────────────────────────────────────────────────────

    async updateMe(name: string, email: string, phone: string, token: string): Promise<any> {
        const response = await fetch(this.#BASE_URL + "/api/v1/users/updateMe/", {
            method: "put",
            headers: this.#getHeaders(token),
            body: JSON.stringify({ name, email, phone })
        })
        return response.json();
    }

    async changeUserPassword(currentPassword: string, password: string, rePassword: string, token: string): Promise<any> {
        const response = await fetch(this.#BASE_URL + "/api/v1/users/changeMyPassword", {
            method: "put",
            headers: this.#getHeaders(token),
            body: JSON.stringify({ currentPassword, password, rePassword })
        })
        return response.json();
    }
}

const apiServices = new ApiServices();
export default apiServices;