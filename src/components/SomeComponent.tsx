import useProductStore from '../store/store';

const SomeComponent = () => {
  const logState = useProductStore(state => state.logState);

  useEffect(() => {
    logState();
  }, []);

  // ... rest of the component
};
