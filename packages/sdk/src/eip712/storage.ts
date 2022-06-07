import { TypedDataField } from '@ethersproject/abstract-signer';

export const ServiceItemData: Record<string, TypedDataField[]> = {
  ServiceItemData: [
    { name: 'item', type: 'bytes32' },
    { name: 'payload', type: 'bytes' }
  ]
};

export const ServiceTermData: Record<string, TypedDataField[]> = {
  ServiceTermData: [
    { name: 'term', type: 'bytes32' },
    { name: 'impl', type: 'address' },
    { name: 'payload', type: 'bytes' }
  ]
};

export const ServiceProviderData: Record<string, TypedDataField[]> = {
  ServiceProviderData: [
    { name: 'serviceProvider', type: 'bytes32' },
    { name: 'items', type: 'ServiceItemData[]' },
    { name: 'terms', type: 'ServiceTermData[]' },
    { name: 'payload', type: 'bytes' }
  ]
};
ServiceProviderData['ServiceItemData'] = ServiceItemData.ServiceItemData;
ServiceProviderData['ServiceTermData'] = ServiceTermData.ServiceTermData;
