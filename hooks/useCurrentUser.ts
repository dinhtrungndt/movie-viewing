import useSWR from "swr";

import fecher from '@/lib/fetcher';

const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/current',fecher);

    return{
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;