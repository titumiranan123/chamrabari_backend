type Category = 'Men' | 'Women' | 'Children' | 'Corporate';
type SubCategory =
    | 'Belt'
    | 'Wallet'
    | 'Long Wallet'
    | 'Purse'
    | 'loffer'
    | 'Shoe'
    | 'Sandel'
    | 'Half Shoe';
export interface Product {
    product_name: string;
    category: Category;
    sub_category: SubCategory;
    Product_details: string;
    price: string;
}

