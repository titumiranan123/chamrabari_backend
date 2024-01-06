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

export interface cart {
    product_name: string;
    category: Category;
    sub_category: SubCategory;
    Product_details: string;
    image_url: string,
    price: string,
    user_email: string,
}