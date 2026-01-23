'use client';

import { Pencil, Trash2, Plus } from '@/components/shared/svg/lucide-icon';
import { useEffect, useState, useCallback } from 'react';
import { IAddressFormData } from '@/interfaces/address.interface';
import toast from 'react-hot-toast';
import { deleteAddress as deleteAddressAPI, editAddress, getAllAddress } from '@/apis/address.api';
import { useRouter } from 'next/navigation';
import AddressMap from './address-map';
import { IAddressData, useAddressStore } from '@/stores/useAddress.store';

const AddressList = () => {
  const { addresses: storeAddresses, defaultAddress, setAddresses, deleteAddress } = useAddressStore();
  
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const router = useRouter();

  const convertToStoreFormat = (apiAddresses: IAddressFormData[]): IAddressData[] => {
    return apiAddresses.map((addr) => ({
      addressId: addr.addressId!,
      label: addr.label,
      mapAddress: addr.mapAddress,
      addressLineOne: addr.addressLineOne,
      addressLineTwo: addr.addressLineTwo || null,
      addressName: addr.addressName,
      addressPhone: addr.addressPhone,
      isDefault: addr.isDefault || false,
      status: true,
    }));
  };

  // ✅ FIX 1: Find primary from CONVERTED addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const response = await getAllAddress();
        if (response.status === 200) {
          const convertedAddresses = convertToStoreFormat(response.payload.addresses);
          setAddresses(convertedAddresses);
          
          // ✅ Search in convertedAddresses (same format as rendered)
          const primary = convertedAddresses.find((a) => a.isDefault);
          const initialSelectedId = primary?.addressId ?? convertedAddresses[0]?.addressId ?? null;
          
          setSelectedId(initialSelectedId);
        }
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
        toast.error('Failed to load addresses');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [setAddresses]);

  // ✅ FIX 2: Don't override selectedId during loading
  useEffect(() => {
    if (defaultAddress && !loading) {
      setSelectedId(defaultAddress.addressId);
    }
  }, [defaultAddress, loading]);

  const handleSelect = useCallback(
    async (address: IAddressData) => {
      if (!address.addressId) {
        toast.error('Invalid address');
        return;
      }

      try {
        const updateData: Partial<IAddressFormData> = {
          addressId: address.addressId,
          isDefault: true,
          label: address.label,
          mapAddress: address.mapAddress,
          addressLineOne: address.addressLineOne,
          addressName: address.addressName,
        };

        const response = await editAddress(updateData as IAddressFormData);
        if (response.status === 200) {
          toast.success('Primary address updated');
          setSelectedId(address.addressId);
          
          const freshAddresses = await getAllAddress();
          if (freshAddresses.status === 200) {
            const convertedAddresses = convertToStoreFormat(freshAddresses.payload.addresses);
            setAddresses(convertedAddresses);
            router.refresh();
          }
        }
      } catch (error: any) {
        console.error('Failed to update primary address:', error);
        toast.error(error.message || 'Something went wrong');
      }
    },
    [router, setAddresses]
  );

  const formatAddress = (a: IAddressData) => {
    return [a.addressLineOne, a.addressLineTwo, a.mapAddress].filter(Boolean).join(', ');
  };

  const handleAddNew = () => {
    setEditingAddressId(null);
    setIsMapOpen(true);
  };

  const handleEdit = (addressId: string) => {
    setEditingAddressId(addressId);
    setIsMapOpen(true);
  };

  const handleMapSave = async (addressData: IAddressFormData) => {
    try {
      let response;
      if (editingAddressId) {
        response = await editAddress(addressData);
        toast.success('Address updated successfully');
      } else {
        response = await editAddress(addressData);
        toast.success('Address created successfully');
      }

      if (response.status === 200 || response.status === 201) {
        setIsMapOpen(false);
        setEditingAddressId(null);
        
        const freshAddresses = await getAllAddress();
        if (freshAddresses.status === 200) {
          const convertedAddresses = convertToStoreFormat(freshAddresses.payload.addresses);
          setAddresses(convertedAddresses);
          router.refresh();
        }
      }
    } catch (error: any) {
      toast.error('Something went wrong');
    }
  };

  // ✅ FIX 3: Update selectedId after delete
  const handleDelete = async (addressId?: string) => {
    if (!addressId) {
      toast.error('Invalid address ID');
      return;
    }

    try {
      const response = await deleteAddressAPI({ addressId });
      if (response.status === 200) {
        deleteAddress(addressId);
        toast.success('Address deleted successfully');
        
        if (selectedId === addressId) {
          const remainingAddresses = storeAddresses.filter(a => a.addressId !== addressId);
          const newDefault = remainingAddresses.find(a => a.isDefault) || remainingAddresses[0];
          setSelectedId(newDefault?.addressId ?? null);
        }
        
        router.refresh();
      }
    } catch (error: any) {
      toast.error('Failed to delete address');
      const freshAddresses = await getAllAddress();
      if (freshAddresses.status === 200) {
        const convertedAddresses = convertToStoreFormat(freshAddresses.payload.addresses);
        setAddresses(convertedAddresses);
      }
    }
  };

  if (loading) {
    return (
      <section className="rounded-md bg-white p-8 text-center">
        <div>Loading addresses...</div>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-md bg-white">
        <div className="space-y-4 py-4">
          {storeAddresses.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <p className="text-sm md:text-base">No addresses found.</p>
              <button
                onClick={handleAddNew}
                className="bg-primary hover:bg-primary/80 mt-4 cursor-pointer rounded px-4 py-2 text-sm text-white transition-colors md:px-6 md:text-base"
              >
                Add your first address
              </button>
            </div>
          ) : (
            storeAddresses.map((address) => (
              <div
                key={address.addressId ?? Math.random()}
                className="flex items-start justify-between gap-2 rounded-md border px-3 py-3 md:gap-3 md:px-4"
              >
                <div className="flex min-w-0 flex-1 items-start gap-2 md:gap-3">
                  {/* ✅ FIX 4: Orange radio button */}
                  <input
                    type="radio"
                    name="deliveryAddress"
                    className="mt-1 h-4 w-4 flex-shrink-0 cursor-pointer accent-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    checked={selectedId === address.addressId}
                    onChange={() => handleSelect(address)}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-medium leading-snug md:text-base">
                      {formatAddress(address)}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500 md:text-sm">
                      {address.addressName} • {address.addressPhone}
                    </p>

                    {address.isDefault && (
                      <span className="mt-1.5 inline-block rounded-full border border-orange-400 bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-600 md:px-3">
                        Primary
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-primary flex flex-shrink-0 items-center gap-1 md:gap-2">
                  <button
                    type="button"
                    className="cursor-pointer rounded-lg p-1 transition-colors hover:bg-orange-50 md:p-1.5"
                    title="Edit"
                    onClick={() => handleEdit(address.addressId!)}
                  >
                    <Pencil className="h-4 w-4 md:h-5 md:w-5" />
                  </button>

                  <button
                    type="button"
                    className="cursor-pointer rounded-lg p-1 transition-colors hover:bg-orange-50 md:p-1.5"
                    title="Delete"
                    onClick={() => handleDelete(address.addressId)}
                  >
                    <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {storeAddresses.length > 0 && (
          <button
            type="button"
            onClick={handleAddNew}
            className="flex w-full items-center justify-center gap-2 rounded border px-4 py-3 text-sm text-primary transition-colors hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60 md:px-6 md:py-4 md:text-base"
            disabled={loading}
          >
            <Plus className="h-4 w-4 md:h-5 md:w-5" />
            <span className="font-medium">Add New Address</span>
          </button>
        )}
      </section>

      <AddressMap
        isOpen={isMapOpen}
        onClose={() => {
          setIsMapOpen(false);
          setEditingAddressId(null);
        }}
        onSave={handleMapSave}
        addressId={editingAddressId || undefined}
      />
    </>
  );
};

export default AddressList;
