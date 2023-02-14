import { apiRequest } from ".";

export const loginAPI = async (url, data) => {
    const response = await apiRequest.post(url, data);

    return response;
}

export const DuplicateCheckAPI = async (url, data) => {
    const response = await apiRequest.post(url, data);

    return response;
}

export const JoinAPI = async (url, data) => {
    const response = await apiRequest.post(url, data);

    return response
}

export const getProductList = async (url) => {
    const response = await apiRequest.get(url)

    return response
}

export const getProductDetail = async (url) => {
    const response = await apiRequest.get(url)

    return response
}

export const getCartList = async (url) => {
    const response = await apiRequest.get(url)

    return response
}

export const putInCartList = async (url, product) => {
    const response = await apiRequest.post(url, product)

    return response
} 

export const updateCartItem = async (url, data) => {
    const response = await apiRequest.put(url, data)

    return response
}

export const deleteCartItem = async (url) => {
    const response = await apiRequest.delete(url)

    return response
}

export const getOrderList = async (url) => {
    const response = await apiRequest.get(url) 

    return response
}

export const OrderAPI = async (url, data) => {
    const response = await apiRequest.post(url, data)

    return response
}

export const sellerValidate = async (url, data) => {
    const response = await apiRequest.post(url, data)

    return response
}

export const sellerJoin = async (url, data) => {
    const response = await apiRequest.post(url, data)

    return response
}