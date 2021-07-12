export interface Product {
    id: string;
    name: string;
    price: number;
    productType: string;
    active: boolean;
}

export interface Column {
    field: string;
    header: string;
    isSortable: boolean;
}
