'use client';

import { Pencil, Trash2, Plus, MapPin } from '@/components/shared/svg/lucide-icon';
import { useEffect, useState, useCallback } from 'react';
import { IAddressFormData } from '@/interfaces/address.interface';
import toast from 'react-hot-toast';
import { deleteAddress as deleteAddressAPI, editAddress, getAllAddress } from '@/apis/address.api';
import { useRouter } from 'next/navigation';
import { IAddressData, useAddressStore } from '@/stores/useAddress.store';
import { Button } from '@/components/ui/button';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import AddressListSkeleton from './address-list-skeleton';
import AddressMapModal from '@/components/modals/address-map-modal';
import DeleteAddressModal from '@/components/modals/delete-address-modal';

const AddressList = () => {
  const { addresses: storeAddresses, defaultAddress, setAddresses, deleteAddress } = useAddressStore();
  const { handleError } = useErrorHandler();

  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingPrimary, setUpdatingPrimary] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<IAddressData | null>(null);
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

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const response = await getAllAddress();
        if (response.status === 200) {
          const convertedAddresses = convertToStoreFormat(response.payload.addresses);
          setAddresses(convertedAddresses);

          // Find primary address from converted addresses
          const primary = convertedAddresses.find((a) => a.isDefault);
          const initialSelectedId = primary?.addressId ?? convertedAddresses[0]?.addressId ?? null;

          setSelectedId(initialSelectedId);
        }
      } catch (error) {
        handleError(error, {
          component: 'Address List',
          action: 'fetch addresses',
          showToast: true,
          fallbackMessage: 'Failed to load addresses',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [setAddresses, handleError]);

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

      // Don't update if already selected
      if (selectedId === address.addressId) {
        return;
      }

      try {
        setUpdatingPrimary(true);
        const updateData: Partial<IAddressFormData> = {
          addressId: address.addressId,
          isDefault: true,
          label: address.label,
          mapAddress: address.mapAddress,
          addressLineOne: address.addressLineOne,
          addressName: address.addressName,
          addressPhone: address.addressPhone,
        };

        const response = await editAddress(updateData as IAddressFormData);
        if (response.status === 200) {
          toast.success('Primary address updated successfully');
          setSelectedId(address.addressId);

          // Refresh addresses
          const freshAddresses = await getAllAddress();
          if (freshAddresses.status === 200) {
            const convertedAddresses = convertToStoreFormat(freshAddresses.payload.addresses);
            setAddresses(convertedAddresses);
            router.refresh();
          }
        }
      } catch (error) {
        handleError(error, {
          component: 'Address List',
          action: 'update primary address',
          showToast: true,
          fallbackMessage: 'Failed to update primary address',
        });
      } finally {
        setUpdatingPrimary(false);
      }
    },
    [router, setAddresses, selectedId, handleError]
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
        toast.success('Address added successfully');
      }

      if (response.status === 200 || response.status === 201) {
        setIsMapOpen(false);
        setEditingAddressId(null);

        // Refresh addresses
        const freshAddresses = await getAllAddress();
        if (freshAddresses.status === 200) {
          const convertedAddresses = convertToStoreFormat(freshAddresses.payload.addresses);
          setAddresses(convertedAddresses);
          router.refresh();
        }
      }
    } catch (error) {
      handleError(error, {
        component: 'Address List',
        action: editingAddressId ? 'edit address' : 'add address',
        showToast: true,
        fallbackMessage: editingAddressId ? 'Failed to update address' : 'Failed to add address',
      });
    }
  };

  const handleDeleteClick = (address: IAddressData) => {
    setAddressToDelete(address);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!addressToDelete?.addressId) return;

    const addressId = addressToDelete.addressId;

    try {
      setDeletingId(addressId);
      const response = await deleteAddressAPI({ addressId });
      if (response.status === 200) {
        deleteAddress(addressId);
        toast.success('Address deleted successfully');

        // Update selected address if deleted address was selected
        if (selectedId === addressId) {
          const remainingAddresses = storeAddresses.filter((a) => a.addressId !== addressId);
          if (remainingAddresses.length > 0) {
            const newDefault = remainingAddresses.find((a) => a.isDefault) || remainingAddresses[0];
            setSelectedId(newDefault?.addressId ?? null);
          } else {
            setSelectedId(null);
          }
        }

        setIsDeleteModalOpen(false);
        setAddressToDelete(null);
        router.refresh();
      }
    } catch (error) {
      handleError(error, {
        component: 'Address List',
        action: 'delete address',
        showToast: true,
        fallbackMessage: 'Failed to delete address',
      });

      // Refresh addresses on error
      try {
        const freshAddresses = await getAllAddress();
        if (freshAddresses.status === 200) {
          const convertedAddresses = convertToStoreFormat(freshAddresses.payload.addresses);
          setAddresses(convertedAddresses);
        }
      } catch (refreshError) {
        handleError(refreshError, {
          component: 'Address List',
          action: 'refresh addresses after delete error',
          showToast: false,
        });
      }
    } finally {
      setDeletingId(null);
    }
  };

  // Show skeleton loader
  if (loading) {
    return <AddressListSkeleton />;
  }

  return (
    <>
      <section className="space-y-3">
        {storeAddresses.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">No addresses found</h3>
            <p className="mb-6 text-sm text-gray-500">Add your first delivery address to get started</p>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="h-4 w-4" />
              Add your first address
            </Button>
          </div>
        ) : (
          <>
            {storeAddresses.map((address) => (
              <div
                key={address.addressId ?? Math.random()}
                className={`group relative flex items-start justify-between gap-3 rounded border-2 p-4 transition-all md:gap-4 md:p-5 ${
                  selectedId === address.addressId
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex min-w-0 flex-1 items-start gap-3 md:gap-4">
                  {/* Radio Button */}
                  <div className="relative mt-1 flex items-center">
                    <input
                      type="radio"
                      name="deliveryAddress"
                      className="accent-primary focus:ring-primary h-5 w-5 shrink-0 cursor-pointer focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      checked={selectedId === address.addressId}
                      onChange={() => handleSelect(address)}
                      disabled={updatingPrimary}
                    />
                  </div>

                  {/* Address Details */}
                  <div className="min-w-0 flex-1">
                    {/* Label Badge */}
                    <div className="mb-2 flex items-center gap-2">
                      <span className="bg-primary-dark inline-flex items-center gap-1.5 rounded-xs px-2.5 py-1 text-xs font-medium text-white">
                        <span className="capitalize">{address.label.toLowerCase()}</span>
                      </span>

                      {address.isDefault && (
                        <span className="bg-primary inline-flex items-center rounded-xs px-2.5 py-1 text-xs font-semibold text-white">
                          Primary
                        </span>
                      )}
                    </div>

                    {/* Address Text */}
                    <p className="mb-2 text-sm leading-relaxed text-gray-900 capitalize md:text-base">
                      {formatAddress(address)}
                    </p>

                    {/* Contact Info */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 md:text-sm">
                      <span className="font-medium capitalize">{address.addressName}</span>
                      <span className="text-gray-400">•</span>
                      <span>{address.addressPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex shrink-0 items-center gap-1 md:gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:bg-primary-dark/10 hover:text-primary h-9 w-9"
                    title="Edit address"
                    onClick={() => handleEdit(address.addressId!)}
                    disabled={deletingId === address.addressId || updatingPrimary}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary-dark/10 h-9 w-9 text-red-600 hover:text-red-700"
                    title="Delete address"
                    onClick={() => handleDeleteClick(address)}
                    disabled={deletingId === address.addressId || updatingPrimary}
                  >
                    {deletingId === address.addressId ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}

            {/* Add New Address Button */}
            <Button
              type="button"
              variant="outline"
              className="text-primary hover:border-primary hover:bg-primary/5 hover:text-primary w-full gap-2 border-2 border-dashed py-6"
              onClick={handleAddNew}
              disabled={loading}
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold">Add New Address</span>
            </Button>
          </>
        )}
      </section>

      {/* Address Map Modal */}
      <AddressMapModal
        isOpen={isMapOpen}
        onClose={() => {
          setIsMapOpen(false);
          setEditingAddressId(null);
        }}
        onSave={handleMapSave}
        addressId={editingAddressId || undefined}
      />

      {/* Delete Confirmation Modal */}
      <DeleteAddressModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAddressToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={!!deletingId}
        addressName={addressToDelete?.addressName}
      />
    </>
  );
};

export default AddressList;
