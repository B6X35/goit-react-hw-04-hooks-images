import { useState, useEffect, useCallback } from "react";
import { ApiService } from "../../shared/api/api";
import style from "./ImageFinder.module.css";
import Loader from "react-loader-spinner";
import SearchForm from "./SearchForm";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import Button from "./Button";

const initialState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  query: "",
  id: "",
  modalOpen: false,
  largeImageURL: "",
};

function ImageFinder() {
  const [state, setState] = useState(initialState);


  useEffect(() => {
    const fetchQuery = async () => {
      const { page, query } = state;
      try {
        const { data } = await ApiService.searchQuery(page, query);
        setState(({ items }) => {
          return {
            ...state,
            items: [...items, ...data.hits],
            loading: false,
            error: null,
          };
        });
      } catch (error) {
        setState({
          loading: false,
          error,
        });
      }
    };
    if (state.query) {
      fetchQuery();
    }
  }, [state.query, state.page]);

  const changeQuery = useCallback(({ query }) => {
    const newState = { ...state, query, page: 1 };
    if (query !== state.query) {
      newState.loading = true;
      state.items.length = 0;
      setState(newState);
    }
  }, []);

  const showModal = useCallback((id) => {
    setState((prevState) => {
      const { items } = prevState;
      const { largeImageURL } = items.find(item => item.id === id);
      return {
        ...state,
        modalOpen: true,
        largeImageURL,
      }
    })
  }, [state.items]);

  const closeModal = () => {
    setState({
      ...state,
      modalOpen: false,
    });
  };

  const LoadMore = () => {
    setState({ ...state, page: state.page + 1 });
  };

  const showBtn = state.items.length >= 12 && !state.loading;

  return (
    <div>
      {state.modalOpen && (
        <Modal closeModal={closeModal}>
          <img
            className={style["img-modal"]}
            src={state.largeImageURL}
            alt={state.query}
          />
        </Modal>
      )}
      <SearchForm onSubmit={changeQuery} />
      {!state.error && <ImageGallery onClick={showModal} items={state.items} />}
      {showBtn && (
        <div className={style.center}>
          <Button onLoadMore={LoadMore} />
        </div>
      )}
      {state.loading && (
        <div className={style.loaderCentre}>
          <Loader type="Oval" color="#a200ff" height={150} width={150} />{" "}
        </div>
      )}
    </div>
  );
}

export default ImageFinder;
