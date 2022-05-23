import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import Loading from './Loading'

const SearchSuggestionContainer = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  background-color: #fff;
  width: 100%;
  z-index: 999999;

  .searchSuggestion {
    display: flex;
    align-items: center;
    margin: 30px 0px;
    padding: 0 10px;
  }

  .searchSuggestion__imgcontainer {
    width: 60px;
    height: 60px;
    position: relative;
  }

  .searchSuggestion__info {
    margin-left: 15px;
    width: 85%;
  }

  .searchSuggestion__title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .searchSuggestion__value {
    margin-top: 5px;
    color: ${({ theme }) => theme.blue};
  }

  .searchSuggestion__total {
    margin: 30px 0px;
    padding: 0 10px;
    text-align: center;
    cursor: pointer;
    color: ${({ theme }) => theme.blue};
  }
`

export function SearchSuggestion({
  products,
  searchTerm,
  isLoading,
  setShowSearchSuggestion,
  showSearchSuggestion
}) {
  const hideSearchSuggestion = () => setShowSearchSuggestion(false)

  return (
    showSearchSuggestion && (
      <SearchSuggestionContainer>
        {isLoading ? (
          <div style={{ height: '100px' }}>
            <Loading />
          </div>
        ) : (
          <>
            {products?.slice(0, 4).map((product) => (
              <SearchSuggestionProduct
                key={product.id}
                product={product}
                hideSearchSuggestion={hideSearchSuggestion}
              />
            ))}

            <Link href={`/search?q=${searchTerm}`}>
              <a
                onClick={hideSearchSuggestion}
                href={`/search?q=${searchTerm}`}
              >
                <p className="searchSuggestion__total">
                  {products?.length > 0
                    ? `${products.length} productos encontrados`
                    : 'No se encontraron productos'}
                </p>
              </a>
            </Link>
          </>
        )}
      </SearchSuggestionContainer>
    )
  )
}

function SearchSuggestionProduct({ product, hideSearchSuggestion }) {
  return (
    <Link href={`/product/${product.id}`}>
      <a onClick={hideSearchSuggestion} href={`/product/${product.id}`}>
        <div className="searchSuggestion">
          <div className="searchSuggestion__imgcontainer">
            <Image
              src={product?.imagenes[0].formats.thumbnail.url}
              layout="fill"
              objectFit="scale-down"
            />
          </div>
          <div className="searchSuggestion__info">
            <p className="searchSuggestion__title">{product.titulo}</p>
            <p className="searchSuggestion__value">
              $ {product.precio_oferta || product.precio}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}
