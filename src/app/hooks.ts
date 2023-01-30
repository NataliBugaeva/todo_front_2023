import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './myStore';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
//чтобы протипизировать их здесь один раз, вместо того чтоб типизировать каждый раз в момент вызова этих хуков
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
