import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Loading from '../../Loading'
import { ProductPriceVertical } from '../../ProductPrice'
import {
	useAddCartItem,
	useDeleteCartItem,
	useRemoveOneToCartItem
} from '../../../hooks/cartHook'
import { ErrorMessage } from '../../ErrorMessage'
import { InfoIcon } from '../../Icons/Info'

const Container = styled.article`
	padding: 30px 0px;
	border-bottom: 1px solid ${({ theme }) => theme.gray};
	background-color: ${({ invalidateProduct }) =>
		invalidateProduct && 'rgba(0, 0, 0, 0.1)'};
	position: relative;

	.invalidProduct {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;
	}

	.info {
		text-align: center;
		width: 200px;
		max-width: 30%;

		&-container {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: space-between;
		}

		&-body {
			display: flex;
			flex-direction: column;
		}
	}

	.image-container {
		position: relative;
		width: 80px;
		height: 80px;
		margin: auto;
	}

	.title {
		font-size: 18px;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		/* stylelint-disable-next-line property-no-vendor-prefix */
		-webkit-box-orient: vertical;
		word-break: break-word;
	}

	.btn {
		border: none;
		background-color: transparent;
		color: ${({ theme }) => theme.blue};

		&:hover {
			cursor: pointer;
		}

		&-container {
			display: inline;
			margin-top: 15px;
		}
	}

	.quantity {
		width: 100%;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid ${({ theme }) => theme.borderGreylight};
		border-radius: 5px;

		&-container {
			width: 100px;
			display: flex;
			flex-direction: column;
		}

		&-loading {
			position: absolute;
			top: 10%;
			right: -40%;
			font-size: 9px;
		}

		&--disabled {
			opacity: 0.5;
		}

		&-btn {
			font-size: 25px;
			cursor: pointer;
			padding: 5px;
			border-color: transparent;
			background-color: inherit;
			color: ${({ theme }) => theme.blue};

			&-subtract {
				margin-bottom: 4px;
			}
		}

		&-num {
			text-align: center;
		}

		&-stock {
			color: ${({ theme }) => theme.gray};
			margin-top: 10px;
			font-size: 14px;
			text-align: center;
		}
	}

	.price-container {
		font-weight: 500;
		font-size: 15px;
	}

	.btn-disabled {
		color: ${({ theme }) => theme.borderGreylight};
	}

	@media (max-width: 425px) {
		padding: 30px 10px;
	}
`

export function CartCard({
	cartItemId,
	productId,
	title,
	price,
	offerPrice,
	image,
	cartItemQuantity,
	productQuantity,
	productPublishedAt
}) {
	const { addCartItem, isLoading: addCartItemLoading } = useAddCartItem(
		productId,
		1
	)

	const { removeOneToCartItem, isLoading: removeOneToCartItemLoading } =
		useRemoveOneToCartItem(cartItemId)

	const { deleteCartItem, isLoading: deleteCartItemLoading } = useDeleteCartItem(
		cartItemId,
		{
			onSuccess: () =>
				toast('Producto eliminado', {
					icon: <InfoIcon />
				})
		}
	)

	const isLoading =
		addCartItemLoading || removeOneToCartItemLoading || deleteCartItemLoading

	const unPublishedProduct = productPublishedAt === null || productQuantity <= 0

	return (
		<Container invalidateProduct={unPublishedProduct}>
			{unPublishedProduct && (
				<span className='invalidProduct'>
					<ErrorMessage>
						Este producto no está disponible por el momento
					</ErrorMessage>
				</span>
			)}
			<div className='info-container'>
				<div className='info'>
					<div className='image-container'>
						<Image
							src={image.url}
							alt={image.alternativeText}
							width={image.width}
							height={image.height}
							objectFit='contain'
							layout='fill'
						/>
					</div>
					<div className='info-body'>
						<Link href={`/product/${productId}`}>
							<a href={`/product/${productId}`}>
								<h1 className='title'>{title}</h1>
							</a>
						</Link>
						<div className='btn-container'>
							<button
								onClick={deleteCartItem}
								type='button'
								className='btn btn--delete'
							>
								Eliminar
							</button>
						</div>
					</div>
				</div>
				<div className='quantity-container'>
					<div className={`quantity ${isLoading ? 'quantity--disabled' : ''}`}>
						<button
							onClick={removeOneToCartItem}
							className={`quantity-btn quantity-btn-subtract subtract ${
								cartItemQuantity === 1 ? 'btn-disabled' : ''
							}`}
							type='button'
							disabled={unPublishedProduct || isLoading || cartItemQuantity === 1}
						>
							-
						</button>
						<p className='quantity-num'>{cartItemQuantity}</p>
						<button
							onClick={addCartItem}
							className={`quantity-btn ${
								cartItemQuantity === productQuantity ? 'btn-disabled' : ''
							}`}
							type='button'
							disabled={
								unPublishedProduct || isLoading || cartItemQuantity === productQuantity
							}
						>
							+
						</button>
						{isLoading && (
							<div className='quantity-loading'>
								<Loading />
							</div>
						)}
					</div>
					<p className='quantity-stock'>{productQuantity} Disponible</p>
				</div>
				<div className='price-container'>
					<ProductPriceVertical price={price} offerPrice={offerPrice} />
				</div>
			</div>
		</Container>
	)
}
