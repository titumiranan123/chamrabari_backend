type Category = 'Men' | 'Women' | 'Children' | 'Corporate' | 'Uni sex';
type SubCategory =
    | 'Belt'
    | 'Wallet'
    | 'Long Wallet'
    | 'Purse'
    | 'loffer'
    | 'Shoe'
    | 'Sandel'
    | 'Half Shoe'
    | 'Bag'
    | 'gadget cover'
    | 'combo';
export interface Product {
    product_name: string;
    category: Category;
    sub_category: SubCategory;
    Product_details: string;
    price: string;
}

