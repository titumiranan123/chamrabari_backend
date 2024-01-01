export interface payment {

    order: {
        name: string,
        phone: number,
        quantity: number,
        DeliveryCharge: number,
        total_price: number,
        address: string,
        area: string,
        district: string,
    };
    paidStatus: boolean;
    tranjectionId: string;
}