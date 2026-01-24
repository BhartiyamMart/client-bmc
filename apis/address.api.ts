import { ApiResponse } from '@/interfaces/api.interface';
import { requestAPI } from '@/lib/axios';
import * as IADDRESS from '@/interfaces/address.interface';

export const editAddress = async (data: IADDRESS.IEditAddressREQ) => {
  return requestAPI<ApiResponse<IADDRESS.IEditAddressRES>, IADDRESS.IEditAddressREQ>(
    'post',
    'v1',
    'address/customer',
    'edit-address',
    data
  );
};

export const getAllAddress = async () => {
  return requestAPI<ApiResponse<IADDRESS.IGetAllAddressRES>, IADDRESS.IGetAllAddressREQ>(
    'get',
    'v1',
    'address/customer',
    'all-address'
  );
};

export const deleteAddress = async (data: IADDRESS.IDeleteAddressREQ) => {
  return requestAPI<ApiResponse<IADDRESS.IDeleteAddressRES>, IADDRESS.IDeleteAddressREQ>(
    'post',
    'v1',
    'address/customer',
    'delete-address',
    data
  );
};
export const getAddressById = async (data: IADDRESS.IGetAddressByIdREQ) => {
  return requestAPI<ApiResponse<IADDRESS.IGetAddressByIdRES>, IADDRESS.IGetAddressByIdREQ>(
    'post',
    'v1',
    'address/customer',
    'get-address-by-id',
    data
  );
};
