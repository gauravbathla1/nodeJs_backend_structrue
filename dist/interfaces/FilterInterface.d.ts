import { ObjectId, Document } from 'mongoose';
export interface FilterInterface extends Document {
    _id?: ObjectId | string;
    categorySlug?: string;
    categoryId: ObjectId | string;
    subcategories: SubcategoryFilter;
    brands: BrandFilter;
    price: PriceFilter;
    color: ColorFilter;
    rating: RatingFilter;
    attributes: AttributeFilter;
}
export interface SubcategoryFilter {
    displayKey: string;
    queryKey: string;
    list: {
        name: string;
        _id: ObjectId | string;
        slug: string;
    }[];
}
export interface BrandFilter {
    displayKey: string;
    queryKey: string;
    list: {
        name: string;
        _id: ObjectId | string;
        slug: string;
    }[];
}
export interface PriceFilter {
    displayKey: string;
    queryKey: string;
    minPrice: number;
    maxPrice: number;
}
export interface ColorFilter {
    displayKey: string;
    queryKey: string;
    list: string[];
}
export interface RatingFilter {
    displayKey: string;
    queryKey: string;
    list: number[];
}
export interface AttributeFilter {
    queryKey: string;
    attributes: {
        displayKey: string;
        queryKey: string;
        list: string[];
    }[];
}
