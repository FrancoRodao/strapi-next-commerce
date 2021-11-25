import styled from 'styled-components'

export const PhoneCardContainer = styled.article`
  position: relative;
  background-color: #fff;
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%);
  transition: box-shadow 0.3s;
  padding-bottom: 10px;
  cursor: pointer;

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .center {
    text-align: center;
  }

  &:hover {
    box-shadow: 0 7px 16px 0 rgb(0 0 0 / 20%), 0 1px 3px 0 rgb(0 0 0 / 10%);
  }

  .footer {
    padding: 0 15px;
  }

  .price {
    font-weight: 500;
    margin-top: 25px;
    margin-bottom: 10px;
    color: #333;
  }

  .real-price {
    margin-top: 5px;
  }

  .offerPrice {
    color: #666;
    margin-bottom: 0px;
    margin-top: 5px;
    text-decoration: line-through;
    font-size: 14px;
  }

  .offer-percentage {
    font-size: 14px;
    color: #39b54a;
    vertical-align: 3px;
  }

  .title {
    font-size: 14px;
    font-weight: 400;
    color: #666;
    height: 3rem;
  }
`
