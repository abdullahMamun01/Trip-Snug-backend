/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertObjectIdToId = (data: any): any => {
    if (!data || typeof data !== 'object') return data;
  
    const { _id, ...rest } = data;
    return {
      id: _id ? _id.toString() : undefined,
      ...rest,
    };
  };
  
  export const convertArrayIdToId = (data: any[]): any[] => {
    if (!Array.isArray(data)) return data;
  
    return data.map((item) => convertObjectIdToId(item));
  };
  