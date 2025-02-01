import { Types } from 'mongoose';

export type TShippingAddressDetails = {
    name: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
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

export type TPaymentResponse = {
    total_amount: number;
    currency: string;
    tran_id: string;
    success_url: string;
    fail_url: string;
    cancel_url: string;
    shipping_method: string;
    product_name: string;
    product_category: string;
    product_profile: string;
    cus_name: string;
    cus_email: string;
    cus_add1: string;
    cus_city: string;
    cus_postcode: string;
    cus_country: string;
    cus_phone: string;
    ship_name: string;
    ship_add1: string;
    ship_city: string;
    ship_postcode: string;
    ship_country: string;
};
