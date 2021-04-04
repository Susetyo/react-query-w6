import React from 'react';
import { Table, Tag, Typography, Row, Pagination ,Image,PageHeader,Spin,Space,Button } from 'antd';
import { useQuery } from "react-query";
import {useHistory} from "react-router-dom";

const { Title } = Typography;

const getMarket = async (page = 1) => {
    const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&per_page=10&page=${page}`;
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Fetching Error");
    }
    return await response.json();
  };
  
  const formatNumber = (num) => {
    return Intl.NumberFormat("id-Id").format(num);
  };

  const Percentage = ({ percent }) => {
    const formatPercent = Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(percent / 100);
  
    let color = "black";
    if (percent > 0) {
      color = "green";
    } else if (percent < 0) {
      color = "red";
    }
  
    return <Tag color={color}>{formatPercent}</Tag>;
  };



function Index() {
    const history = useHistory();
    const [page, setPage] = React.useState(1)
    const { isLoading, isFetching, isSuccess, isError, data } = useQuery(['market',page],()=>getMarket(page),{
        // staleTime:3000,
        // refetchInterval:3000
    });
    
    const columns = [
        {
          title: 'Coin',
          dataIndex: 'coin',
          key: 'coin',
          render: (text, record) => {
                return (
                    <div style={{display:"flex", justifyContent:"start",alignItems:"center"}}>
                        <Image
                            width={50}
                            height={50}
                            src={record.image}
                        />
                        <a style={{paddingRight:15, paddingLeft:15}}>{record.id}</a>
                        <Tag>
                            {record.symbol}
                        </Tag>
                    </div>
                )
            }
        },
        {
          title: 'Last Price',
          dataIndex: 'current_price',
          key: 'current_price',
          render:(text, record) => (formatNumber(record.current_price))
        },
        {
          title: '24h % Change',
          dataIndex: 'price_change_percentage_24h',
          key: 'price_change_percentage_24h',
          render:(text, record) => (<Percentage percent={record.price_change_percentage_24h} />)
        },
        {
            title: 'Total Volume',
            dataIndex: 'total_volume',
            key: 'total_volume',
        },
        {
            title: 'Total Volume',
            dataIndex: 'market_cap',
            key: 'market_cap',
        },
      ];
    
    
    if(isError){
        return(        
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => history.push("/")}
                    title="Back to home"
                />
                <Row justify="center">
                    <Title>Something went wrong please going back to home page !</Title>
                </Row>
            </div>
        )
    }

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => history.push("/")}
                title="Back to home"
            />
            {isFetching && (  
                    <Row justify="end" style={{marginTop:15}}>
                        <Space size="middle">    
                            <Spin size="large" />
                        </Space>
                    </Row>
                )
            }
            <Row justify="center">
                <Title>Crypto Market</Title>
            </Row>
            <Row justify="center" style={{marginTop:15}}>
                <Table columns={columns} dataSource={ isSuccess ? data : []} pagination={false}/>
            </Row>
            <Row justify="center" style={{marginTop:15}}>
                <Button shape="circle"
                    onClick={()=> setPage(old => old-1)}
                    disabled={page===1 ? true:false}
                >
                    {'<'}
                </Button>
                {page}
                <Button onClick={()=> setPage(old => old+1)} shape="circle">{'>'}</Button>
            </Row>
        </div>
    )
}

export default Index
