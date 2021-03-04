import { useState, useEffect } from 'react';
import { Layout, Row, Col, Tag, Spin, message } from 'antd';
import { path } from 'ramda';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import ProductsInCart, { calculatePrice } from '../../components/ProductInCart';
import ProductList from '../../components/ProductList';

const { Content, Sider } = Layout;
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const GET_VENDING_MACHINE = gql`
  query VendingMachine($machineId: ID!, $page: Int!, $limit: Int!) {
    vendingMachine(machineId: $machineId) {
      machineId
      statusCode
      locationId
      products(page: $page, limit: $limit) {
        count
        rows {
          quantity
          product {
            productId
            name
            imageUrl
            price: thPrice
          }
        }
      }
    }
  }
`;

const CREATE_ORDER = gql`
  mutation CreateOrder(
    $machineId: ID!
    $purchaseProducts: [PurchaseProduct!]!
  ) {
    createVendingMachineOrder(
      machineId: $machineId
      purchaseProducts: $purchaseProducts
    )
  }
`;

function HomePage() {
  // set machineCode, machineId in local storage for change machine
  // set balance in local storage for generate cash
  const machineCode =
    localStorage.getItem('vending_machine_machine_code') || 'Unknown';
  const machineId =
    localStorage.getItem('vending_machine_machine_id') || 'test';
  const initialBalance = Number(
    localStorage.getItem('vending_machine_balance') || '0'
  );

  const [products, setProducts] = useState([]);
  const [productsInCart, setProductInCart] = useState([]);
  const [balance, setBalance] = useState(initialBalance);
  const [
    getVendingMachine,
    { loading: getVendingMachineLoading },
  ] = useLazyQuery(GET_VENDING_MACHINE, {
    onCompleted: (data) => {
      const vendingMachineProducts =
        path(['vendingMachine', 'products', 'rows'], data) || [];
      const _products = vendingMachineProducts.map((vendingMachineProduct) => ({
        productId: path(['product', 'productId'], vendingMachineProduct),
        name: path(['product', 'name'], vendingMachineProduct),
        imageUrl: path(['product', 'imageUrl'], vendingMachineProduct),
        price: path(['product', 'price'], vendingMachineProduct),
        quantity: path(['quantity'], vendingMachineProduct),
      }));
      setProducts(_products);
    },
  });
  const [createOrder, { loading: createOrderLoading }] = useMutation(
    CREATE_ORDER,
    {
      onCompleted: () => {
        setProductInCart([]);
        message.success('Successfully purchased');
      },
    }
  );

  useEffect(() => {
    getVendingMachine({ variables: { machineId, page: 1, limit: 20 } });
  }, [getVendingMachine, machineId]);

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
      newProductsInCart[index].price = productsInCart[index].price + price;
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

  const onPurchase = () => {
    const newBalance = balance - calculatePrice(productsInCart);
    setBalance(newBalance);

    const purchaseProducts = productsInCart.map((product) => {
      return {
        productId: product.productId,
        quantity: product.quantity,
      };
    });
    createOrder({ variables: { machineId, purchaseProducts } });
  };

  return (
    <Spin
      tip="Loading..."
      size="lg"
      indicator={loadingIcon}
      spinning={getVendingMachineLoading || createOrderLoading}
    >
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

          <Row
            type="flex"
            justify="center"
            align="top"
            style={{ marginTop: 50 }}
          >
            <Col span={16}>
              <ProductsInCart
                products={productsInCart}
                balance={balance}
                onDeleteProductInCart={onDeleteProductInCart}
                onPurchase={onPurchase}
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
    </Spin>
  );
}

export default HomePage;
