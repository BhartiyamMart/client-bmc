export interface IAddressFormData {
  addressId?: string;
  label: string;
  labelDescription?: string;
  addressLineOne: string;
  addressLineTwo?: string;
  landmark?: string;
  mapAddress: string;
  addressName: string;
  addressPhone: string;
  latitude?: string;
  longitude?: string;
  isDefault?: boolean;
}

export interface IAddressMapProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IAddressFormData) => void;
  addressId?: string;
}

export type IEditAddressREQ = IAddressFormData;

export interface IEditAddressRES {}

export interface IGetAllAddressREQ {}
export interface IGetAllAddressRES {
  count: number;
  addresses: IAddressFormData[];
}

export interface IDeleteAddressRES {}
export interface IDeleteAddressREQ {
  addressId: string;
}

export interface IGetAddressByIdREQ {
  addressId: string;
}

export interface IGetAddressByIdRES {
  // Core form fields (keep required)
  address: IAddressFormData;
}
