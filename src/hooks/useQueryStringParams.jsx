import { useSearchParams } from "react-router-dom";

export function useQueryStringParams(key) {
    const [ searchParams, setSearchParams ] = useSearchParams({
        [key]: ""
    });
    const value = searchParams.get(key);

    const setValue = (newVal) => {
      setSearchParams(prev => {
        prev.set(key, newVal)
        return prev;
      }, { replace: true })
    }

    return [ value, setValue ];
}
