module.exports = {
  createPaypalStrapiOrder: (
    userId,
    orders,
    orderTotalPrice,
    payerInfo,
    transactionId
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const strapiOrders = orders.map((product) => ({
          __component: 'custom.producto_pedido',
          // look at the frontend/helpers/createPaypalOrderObject file to understand where the id comes from
          producto: { id: Number(product.description.split('ID: ')[1]) },
          cantidad: product.quantity,
          precio_de_compra: product.unit_amount.value
        }))

        /* UPDATE STOCK  */
        const productsQuery = await strapi.query('producto')
        const productsUpdatesPromises = []

        for (const order of strapiOrders) {
          const dbProduct = await productsQuery.findOne({
            id: order.producto.id
          })

          if (order.cantidad > dbProduct.cantidad) {
            reject({
              strapiOrderError: `We don't have enough stock of ${dbProduct.titulo}`
            })
          }
          if (!dbProduct.published_at) {
            reject({
              strapiOrderError: `the product ${dbProduct.titulo} is not published`
            })
          }

          const quantityUpdate =
            Number(dbProduct.cantidad) - Number(order.cantidad)
          const unpublishProductBool = quantityUpdate === 0

          productsUpdatesPromises.push(
            productsQuery.update(
              {
                id: order.producto.id
              },
              {
                vendidos: Number(dbProduct.vendidos) + Number(order.cantidad),
                cantidad: quantityUpdate,
                // published_at: null --> unpublish the product
                published_at: unpublishProductBool
                  ? null
                  : dbProduct.published_at
              }
            )
          )
        }

        await Promise.all(productsUpdatesPromises)

        /* UPDATE STOCK  */

        /*  CREATE STRAPI ORDER  */
        const orderQuery = await strapi.query('pedidos')

        const createdOrder = await orderQuery.create({
          productos: strapiOrders,
          total: orderTotalPrice,
          user: userId,
          entregado: false,
          info_de_pago: {
            __component: 'pagos.info_de_pago',
            metodo_de_pago: 'PAYPAL',
            correo_de_pago: payerInfo.email,
            nombre_de_pago: payerInfo.name,
            apellido_de_pago: payerInfo.surname,
            id_de_transaccion: transactionId
          }
        })
        /*  CREATE STRAPI ORDER  */

        resolve(createdOrder)
      } catch (error) {
        reject({
          strapiOrderError: 'unexpected error when creating the order'
        })
      }
    })
  }
}
