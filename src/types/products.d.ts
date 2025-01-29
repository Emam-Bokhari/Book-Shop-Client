export type TProduct = {
    title: string;
    category:
    | 'fiction'
    | 'nonFiction'
    | 'academic'
    | 'philosophy'
    | 'children'
    | 'science'
    | 'religion'
    | 'history';
    author: string;
    description: string;
    price: number;
    image: string;
    publisher: string;
    publishedDate: Date;
    edition?: string;
    language:
    | 'bengali'
    | 'english'
    | 'arabic'
    | 'hindi'
    | 'spanish'
    | 'french'
    | 'german';
    pages?: number;
    rating: number;
    discount?: number;
    format: 'hardcover' | 'paperback' | 'eBook' | 'audioBook';
    quantity: number;
    isDeleted?: boolean;
};
