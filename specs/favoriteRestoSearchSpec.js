/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-restos/favorite-resto-search-presenter';
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto-idb';
import FavoriteRestoSearchView from '../src/scripts/views/pages/liked-restos/favorite-resto-search-view';

describe('Searching restos', () => {
  let presenter;
  let favoriteRestos;
  let view;

  const searchRestos = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    view = new FavoriteRestoSearchView();
    document.body.innerHTML = view.getTemplate();
  };
  const constructPresenter = () => {
    favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb);
    presenter = new FavoriteRestoSearchPresenter({
      favoriteRestos,
      view,
    });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestos('resto a');

      expect(presenter.latestQuery).toEqual('resto a');
    });

    it('should ask the model to search for liked restos', () => {
      searchRestos('resto a');

      expect(favoriteRestos.searchRestos)
        .toHaveBeenCalledWith('resto a');
    });

    it('should show - when the resto returned does not contain a title', (done) => {
      document.getElementById('resto-search-container').addEventListener('restos:searched:updated', () => {
        const restoTitles = document.querySelectorAll('.resto__title');
        expect(restoTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([
        { id: 444 },
      ]);

      searchRestos('resto a');
    });

    it('should show the restos found by Favorite Restos', (done) => {
      document.getElementById('resto-search-container')
        .addEventListener('restos:searched:updated', () => {
          expect(document.querySelectorAll('.resto').length).toEqual(3);
          done();
        });

      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([
        { id: 111, title: 'resto abc' },
        { id: 222, title: 'ada juga resto abcde' },
        { id: 333, title: 'ini juga boleh resto a' },
      ]);

      searchRestos('resto a');
    });

    it('should show the name of the restos found by Favorite Restos', (done) => {
      document.getElementById('resto-search-container').addEventListener('restos:searched:updated', () => {
        const restoTitles = document.querySelectorAll('.resto__title');
        expect(restoTitles.item(0).textContent).toEqual('resto abc');
        expect(restoTitles.item(1).textContent).toEqual('ada juga resto abcde');
        expect(restoTitles.item(2).textContent).toEqual('ini juga boleh resto a');

        done();
      });

      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([
        { id: 111, title: 'resto abc' },
        { id: 222, title: 'ada juga resto abcde' },
        { id: 333, title: 'ini juga boleh resto a' },
      ]);

      searchRestos('resto a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestos(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestos('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestos('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestos('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restos', () => {
      searchRestos('    ');
      expect(favoriteRestos.getAllRestos)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite restos could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('resto-search-container')
        .addEventListener('restos:searched:updated', () => {
          expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);
          done();
        });

      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([]);

      searchRestos('resto a');
    });

    it('should not show any resto', (done) => {
      document.getElementById('resto-search-container').addEventListener('restos:searched:updated', () => {
        expect(document.querySelectorAll('.resto').length).toEqual(0);
        done();
      });
      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([]);
      searchRestos('resto a');
    });
  });
});
