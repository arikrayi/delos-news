import { useContext } from 'react';
import { StorageContext } from '@/providers/ContextProvider';

const useStorage = () => useContext(StorageContext);

export default useStorage;
