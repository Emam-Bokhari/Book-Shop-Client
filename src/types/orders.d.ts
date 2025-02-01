import { Types } from 'mongoose';
import { ApiResponse } from './api';

export type TShippingAddressDetails = {
    name: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
};

export type TProduct = {
    productId: {
        title: string;
        category: string;
        author: string;
        description: string;
    };
    quantity: number;
};

export type TOrder = {
    userId?: Types.ObjectId;
    products: {
        productId: Types.ObjectId;
        quantity: number;
    }[];

    totalAmount?: number;
    paymentMethod?: string;
    paymentStatus?: 'pending' | 'completed' | 'failed' | 'canceled';

    shippingAddressDetails: TShippingAddressDetails;
    status: 'pending' | 'shipping' | 'delivered';
    orderDate?: Date;
    transactionId?: string;
};



export type OrderApiResponse = ApiResponse<TOrder[]>
