export interface SignUp{
    name: string,
    password: string,
    email: string
}
export interface signIn{
    email: string,
    password: string
}
export interface Product{
    name: string,
    price: number,
    colour:string,
    category:string,
    description: string,
    imageUrl:string,
    id:number,
    quantity : undefined | number,
    productId : undefined | number
}
export interface Cart{
    name: string,
    price: number,
    colour:string,
    category:string,
    description: string,
    imageUrl:string,
    id:number | undefined,
    quantity : undefined | number,
    userId : number,
    productId : number
}
export interface priceSummary{
    price : number,
    discount : number,
    tax : number,
    delivery: number,
    total : number
}
export interface Order{
    email:string,
    address:string,
    contact: string,
    totalPrice: number,
    userId: string,
    id: number | undefined
}