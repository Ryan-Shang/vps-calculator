import { useState } from 'react';
import useStore from '@/hooks/useStore'
import dayjs from 'dayjs';

const isProduction = process.env.NODE_ENV === 'production';
const url = isProduction ? 'https://open.er-api.com/v6/latest/CNY' : '/api/v6/latest/CNY'

export const useRateData = () => {
    const { rateStore } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const setRateData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            if(!res.ok) {
                throw new Error('Request Error!');
            }
            const { rates = {}, time_last_update_unix = 0, base_code = 'CNY' } = await res.json();
            setIsLoading(false);
            const formattedTime = dayjs(time_last_update_unix * 1000).format('YYYY-MM-DD HH:mm:ss');
            rateStore.setDate(formattedTime);
            rateStore.setBase(base_code);
            rateStore.setRates(rates);
        } catch (error) {
            setIsLoading(false);
            console.error('Error: ', error);
        }
    };

    return { setRateData, isLoading }
};

export default useRateData;