import { Row, Col, Card } from 'antd';

function ProductItem({
  name,
  price,
  imageUrl,
  productId,
  quantity = 0,
  onClickProduct,
}) {
  const isOutOfStock = quantity < 1;
  return (
    <Col span={8}>
      {isOutOfStock ? (
        <Card
          style={{ opacity: 0.5, cursor: 'not-allowed' }}
          cover={<img alt={name} src={imageUrl} />}
        >
          <Card.Meta
            title={<span style={{ color: 'red' }}>Out of Stock</span>}
          />
        </Card>
      ) : (
        <Card
          hoverable
          cover={<img alt={name} src={imageUrl} />}
          onClick={() =>
            onClickProduct({ productId, name, imageUrl, quantity, price })
          }
        >
          <Card.Meta title={`${name} ${price} Baht (${quantity})`} />
        </Card>
      )}
    </Col>
  );
}

function ProductList({ products, onClickProduct }) {
  return (
    <div className="site-card-wrapper">
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <ProductItem
            key={product.productId}
            {...product}
            onClickProduct={onClickProduct}
          />
        ))}
      </Row>
    </div>
  );
}

export default ProductList;
