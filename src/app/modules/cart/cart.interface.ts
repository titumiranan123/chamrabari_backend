type Category = 'men' | 'women' | 'children' | 'corporate' | 'uni-sex';
type SubCategory =
    | 'belt'
    | 'wallet'
    | 'long-wallet'
    | 'purse'
    | 'loffer'
    | 'shoe'
    | 'sandel'
    | 'half-shoe'
    | 'bag'
    | 'gadget-cover'
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