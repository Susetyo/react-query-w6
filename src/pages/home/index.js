import React from 'react';
import { Row, Col,  Card, Typography } from 'antd';
import {useHistory} from "react-router-dom";
const { Title } = Typography;

const styleCustom = {
    display:"flex",
    width:"100%",
    height:"100%",
    flexDirection:"column",
    justifyContent:"center",
}

function Index() {
    const history = useHistory();

    const goTo = (url) => history.push(url);

    return (
        <div style={styleCustom}>
            <Row  justify="center" style={{marginBottom:20}}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Title style={{textAlign:"center"}}>React Query</Title>
                </Col>
            </Row>
            <Row  justify="center">
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Card bordered={false} style={{ width: 300 }} onClick={()=>goTo("/crypto")}>
                        <Title level={2}>Crypto</Title>
                        <img src={"https://assets.coingecko.com/rewards/images/33/CG_Candy_Swag-01.png?16006881440"} style={{width:"100%", height:252, objectFit:"cover"}} />
                    </Card>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Card bordered={false} style={{ width: 300 }} onClick={()=>goTo("/post")}>
                        <Title level={2}>POST IT</Title>
                        <img src={"https://play-lh.googleusercontent.com/gQ0d5KGNcspEHQH6LQWtGRLL-ynamsI2oibl1R0gd9C2n3_jAGWynXpL6c4uEEy9ygMt"} style={{width:"100%"}} />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Index
