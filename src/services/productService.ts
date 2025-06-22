import { RequestBody, RequestHeaders } from "~types/httpHook";
import { GetAllProductsParams, ProductsDataResponse } from "~types/product";

type RequestFunction = <T>(
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: RequestBody | RequestBody[] | null,
  headers?: RequestHeaders,
  isAuthRequest?: boolean,
  isBinaryResponse?: boolean
) => Promise<T>;

export const getAllProducts = async (
  request: RequestFunction,
  params: GetAllProductsParams = {}
) => {
  try {
    const query = new URLSearchParams();

    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.search) query.append('search', params.search);
    if (params.category) query.append('category', params.category);
    if (params.purpose) query.append('purpose', params.purpose);

    const queryString = query.toString();
    const url = `/help/api/product${queryString ? `?${queryString}` : ''}`;

    const data: ProductsDataResponse = await request(url);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const createProduct = async (
  request: RequestFunction,
  productData: {
    name: string;
    description: string;
    category: string;
    images: string[];
    purpose: string;
  }
) => {
  try {
    const response = await request('/help/api/product/create', 'POST', productData, undefined, true);
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};


export const putProduct = async (
  request: RequestFunction,
  productData: {
    name: string;
    description: string;
    category: string;
    images: string[];
    purpose: string;
  },
  productID: string
) => {
  try {
    const response = await request(`/help/api/product/${productID}`, 'PUT', productData);
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};



export const getProduct = async (
  request: RequestFunction,
  productID:string
) => {
  try {
    const response = await request(`/help/api/product/task/${productID}`);
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getUserProducts = async (
  request: RequestFunction,
    userId: string,
  params: GetAllProductsParams = {},
) => {
  try {
    const query = new URLSearchParams();

    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.search) query.append('search', params.search);
    if (params.category) query.append('category', params.category);

    const queryString = query.toString();
    const url = `/help/api/product/user/${userId}${queryString ? `?${queryString}` : ''}`;

    const data: ProductsDataResponse = await request(url);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const deleteProduct = async (
  request: RequestFunction,
  productID: string
) => {
  try {
    await request(`/help/api/product/${productID}`, 'DELETE',);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};





