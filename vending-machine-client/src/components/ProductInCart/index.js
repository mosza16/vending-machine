import { Row, Col, Card, List, Button } from 'antd';

export function calculatePrice(products = []) {
  if (products.length < 1) return 0;
  return products.reduce((sum, product) => {
    sum += product.price;
    return sum;
  }, 0);
}

function ProductsInCart({
  products = [],
  balance = 100,
  onDeleteProductInCart,
  onPurchase,
}) {
  const totalPrice = calculatePrice(products);
  const isCanPurchase = balance >= totalPrice && products.length > 0;

  const ProductList = () => (
    <List
      itemLayout="horizontal"
      dataSource={products}
      locale={{ emptyText: 'There are no orders selected' }}
      footer={
        <Row gutter={16} type="flex" justify="end" align="bottom">
          <Col span={16} style={{ textAlign: 'right' }}>
            <b>{`Total ${totalPrice} Baht`}</b>
          </Col>
          <Col span={16} style={{ textAlign: 'right' }}>
            <b>{`Balance ${balance} Baht`}</b>
          </Col>
        </Row>
      }
      renderItem={({
        productId,
        name,
        imageUrl,
        quantity,
        price,
        pricePerUnit,
      }) => (
        <List.Item
          key={productId}
          actions={[
            <a
              href="#"
              key="list-delete"
              onClick={() => onDeleteProductInCart({ productId, pricePerUnit })}
            >
              Delete
            </a>,
          ]}
        >
          <List.Item.Meta
            title={
              <div>
                <img width={70} alt={name} src={imageUrl} />
              </div>
            }
          />
          <div>{`x${quantity} = ${price} baht`}</div>
        </List.Item>
      )}
    />
  );

  return (
    <Card
      title="Order List"
      bordered={false}
      actions={[
        <Button
          type="primary"
          size="large"
          disabled={!isCanPurchase}
          onClick={onPurchase}
        >
          Purchase
        </Button>,
      ]}
    >
      <ProductList></ProductList>
    </Card>
  );
}

export default ProductsInCart;
