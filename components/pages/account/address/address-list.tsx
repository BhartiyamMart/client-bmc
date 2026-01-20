'use client';

import { Pencil, Trash2, Plus } from '@/components/shared/svg/lucide-icon';
import { useEffect, useState, useCallback } from 'react';
// import AddressMap from './address-map';
import { IAddressFormData } from '@/interfaces/address.interface';
import toast from 'react-hot-toast';
import { deleteAddress, editAddress, getAllAddress, getAddressById } from '@/apis/address.api';
import { useRouter } from 'next/navigation';
import AddressMap from './address-map';

const AddressList = () => {
  const [addresses, setAddresses] = useState<IAddressFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null); // ✅ New state for edit mode
  const router = useRouter();

  // ✅ Fetch addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const response = await getAllAddress();
        if (response.status === 200) {
          setAddresses(response.payload.addresses);
          const primary = response.payload.addresses.find((a: IAddressFormData) => a.isDefault);
          setSelectedId(primary?.addressId ?? response.payload.addresses[0]?.addressId ?? null);
        }
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
        toast.error('Failed to load addresses');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  // ✅ Fixed handleSelect
  const handleSelect = useCallback(
    async (address: IAddressFormData) => {
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
            setAddresses(freshAddresses.payload.addresses);
            router.refresh();
          }
        }
      } catch (error: any) {
        console.error('Failed to update primary address:', error);
        toast.error(error.message || 'Something went wrong');
      }
    },
    [router]
  );

  const formatAddress = (a: IAddressFormData) => {
    return [a.addressLineOne, a.addressLineTwo, a.landmark, a.mapAddress].filter(Boolean).join(', ');
  };

  // ✅ Updated handleAddNew - no addressId for new address
  const handleAddNew = () => {
    setEditingAddressId(null); // ✅ Clear editing ID for new address
    setIsMapOpen(true);
  };

  // ✅ New handleEdit - passes addressId for editing
  const handleEdit = (addressId: string) => {
    setEditingAddressId(addressId); // ✅ Set editing ID
    setIsMapOpen(true);
  };

  const handleMapSave = async (addressData: IAddressFormData) => {
    try {
      let response;
      if (editingAddressId) {
        // ✅ Edit existing address
        response = await editAddress(addressData);
        toast.success('Address updated successfully');
      } else {
        // ✅ Create new address
        response = await editAddress(addressData);
        toast.success('Address created successfully');
      }

      if (response.status === 200 || response.status === 201) {
        setIsMapOpen(false);
        setEditingAddressId(null); // ✅ Reset editing state
        // Refetch addresses
        const freshAddresses = await getAllAddress();
        setAddresses(freshAddresses.payload.addresses);
        router.refresh();
      }
    } catch (error: any) {
      toast.error('Something went wrong');
    }
  };

  // ✅ Fixed handleDelete
  const handleDelete = async (addressId?: string) => {
    if (!addressId) {
      toast.error('Invalid address ID');
      return;
    }

    try {
      const response = await deleteAddress({ addressId });
      if (response.status === 200) {
        toast.success('Address deleted successfully');
        router.refresh(); // ✅ Fixed
      }
    } catch (error: any) {
      toast.error('Failed to delete address');
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
          {addresses.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <p>No addresses found.</p>
              <button
                onClick={handleAddNew}
                className="bg-primary hover:bg-primary/80 mt-4 cursor-pointer rounded px-6 py-2 text-white"
              >
                Add your first address
              </button>
            </div>
          ) : (
            addresses.map((address) => (
              <div
                key={address.addressId ?? Math.random()}
                className="flex items-start justify-between rounded-md border px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryAddress"
                    className="mt-1 h-4 w-4 cursor-pointer text-orange-500 ring-orange-600 focus:ring-orange-500"
                    checked={selectedId === address.addressId}
                    onChange={() => handleSelect(address)}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{formatAddress(address)}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {address.addressName} • {address.addressPhone}
                    </p>

                    {address.isDefault && (
                      <span className="mt-1 inline-block rounded-full border border-orange-400 bg-orange-50 px-3 py-0.5 text-xs font-medium text-orange-600">
                        Primary
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-primary flex items-center gap-2">
                  {/* ✅ Edit button now calls handleEdit with addressId */}
                  <button
                    type="button"
                    className="cursor-pointer rounded-lg p-1.5 transition-colors"
                    title="Edit"
                    onClick={() => handleEdit(address.addressId!)} // ✅ Pass addressId
                  >
                    <Pencil className="h-4 w-4 md:h-6 md:w-6" />
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer rounded-lg p-1.5 transition-colors"
                    title="Delete"
                    onClick={() => handleDelete(address.addressId)}
                  >
                    <Trash2 className="h-4 w-4 md:h-6 md:w-6" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {addresses.length > 0 && (
          <button
            type="button"
            onClick={handleAddNew}
            className="flex w-full items-center justify-center gap-2 rounded border px-6 py-4 text-orange-500 transition-colors hover:bg-orange-50"
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
            <span className="font-medium">Add New Address</span>
          </button>
        )}
      </section>

      {/* ✅ Pass editingAddressId to AddressMap */}
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
