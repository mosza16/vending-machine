import { useState } from 'react';
import { Layout, Row, Col, Tag } from 'antd';
import ProductsInCart from '../../components/ProductInCart';
import ProductList from '../../components/ProductList';

const { Content, Sider } = Layout;

const initialProducts = [
  {
    productId: 'p1',
    name: 'Pepsi',
    imageUrl:
      'https://www.colbeck.co.uk/wp-content/uploads/2017/11/Pepsi-Can.jpg',
    price: 10,
    quantity: 20,
  },
  {
    productId: 'p2',
    name: 'Pepsi',
    imageUrl:
      'https://www.colbeck.co.uk/wp-content/uploads/2017/11/Pepsi-Can.jpg',
    price: 10,
    quantity: 0,
  },
  {
    productId: 'p3',
    name: 'Pepsi',
    imageUrl:
      'https://www.colbeck.co.uk/wp-content/uploads/2017/11/Pepsi-Can.jpg',
    price: 10,
    quantity: 10,
  },
];

function HomePage() {
  const machineCode =
    localStorage.getItem('vending_machine_machine_code') || 'Unknown';
  const balance = Number(
    localStorage.getItem('vending_machine_balance') || '0'
  );

  const [products, setProducts] = useState(initialProducts);
  const [productsInCart, setProductInCart] = useState([]);

  const addProductBack = ({ productId }) => {
    let newProducts = [...products];
    const index = products.findIndex(
      (product) => product.productId === productId
    );
    newProducts[index].quantity = products[index].quantity + 1;

    setProducts(newProducts);
  };

  const addProductToCart = ({ productId, name, imageUrl, price }) => {
    let newProductsInCart = [...productsInCart];
    const index = productsInCart.findIndex(
      (product) => product.productId === productId
    );
    if (index > -1) {
      newProductsInCart[index].quantity = productsInCart[index].quantity + 1;
      newProductsInCart[index].price = newProductsInCart[index].price + price;
    } else {
      newProductsInCart.push({
        productId,
        name,
        imageUrl,
        quantity: 1,
        price,
        pricePerUnit: price,
      });
    }
    setProductInCart(newProductsInCart);
  };

  const onClickProduct = ({ productId, name, imageUrl, price }) => {
    let newProducts = [...products];
    const index = products.findIndex(
      (product) => product.productId === productId
    );
    newProducts[index].quantity = products[index].quantity - 1;
    setProducts(newProducts);

    // add to cart
    addProductToCart({ productId, name, imageUrl, price });
  };

  const onDeleteProductInCart = ({ productId, pricePerUnit }) => {
    let newProductsInCart = [...productsInCart];
    const index = productsInCart.findIndex(
      (product) => product.productId === productId
    );
    newProductsInCart[index].quantity = productsInCart[index].quantity - 1;
    newProductsInCart[index].price = productsInCart[index].price - pricePerUnit;

    if (newProductsInCart[index].quantity < 1) {
      newProductsInCart.splice(index, 1);
    }
    setProductInCart(newProductsInCart);

    addProductBack({ productId });
  };

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        width={500}
      >
        <div className="logo" style={{ textAlign: 'right', marginTop: 10 }}>
          <Tag color="#108ee9">Machine Code: {machineCode}</Tag>
        </div>

        <Row type="flex" justify="center" align="top" style={{ marginTop: 50 }}>
          <Col span={16}>
            <ProductsInCart
              products={productsInCart}
              balance={balance}
              onDeleteProductInCart={onDeleteProductInCart}
            ></ProductsInCart>
          </Col>
        </Row>
      </Sider>
      <Layout
        className="site-layout"
        style={{ marginLeft: 500, height: '100vh' }}
      >
        <Content style={{ margin: '24px 16px 0', overflow: 'scroll' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: 'center' }}
          >
            <ProductList
              products={products}
              onClickProduct={onClickProduct}
            ></ProductList>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomePage;
