import { useContext } from "react";
import stores from '@/store';
import { MobXProviderContext } from "mobx-react";

export const useStore = () => useContext(MobXProviderContext) as typeof stores;

export default useStore;