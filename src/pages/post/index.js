import React, {useRef,useState} from 'react';
import { Row, Col, Form, Input, Button, Checkbox,PageHeader, Table, Typography } from 'antd';
import {useHistory} from "react-router-dom";
import { useQuery,useMutation , useQueryClient } from "react-query";

const { Title } = Typography;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const getPostAPI = async() => {
    const URL= "https://jsonplaceholder.typicode.com/posts";
    const res = await fetch(URL)

    if(!res.ok){
        throw new Error("Failed fetching")
    }

    return await res.json()
}

const submitPost = async(data) => {
    const URL = 'https://jsonplaceholder.typicode.com/posts';
    const res = await fetch(URL, {
        mode: 'cors',
        method:"POST",
        body: JSON.stringify(data)
    })

    if(!res.ok){
        throw new Error("Has error occured");
    }

    return await res.json()
}


function Index() {
    const queryClient = useQueryClient();
    const history = useHistory();
    const title = useRef();
    const body = useRef();

    const { isSuccess, data} = useQuery("get-post-w6",getPostAPI,{
        staleTime:15000,
        refetchInterval:15000
    });

    const [errorMessage, setErrorMessage] = useState("")
    const [titleDefault, setTitleDefault] = useState("")
    const [bodyDefault, setBodyDefault] = useState("")

    const mutation = useMutation(submitPost, {
        onMutate:()=>{
            console.log('on Mutated')
        },
        onSettled: async(data, error)=>{
            if(data){
                queryClient.invalidateQueries("get-post-w6");
                console.log(data,'Done refetching')
                setTitleDefault("");
                setBodyDefault("");
            }
            console.log('on Settled')

            if(error) setErrorMessage(error.message)
        },
        onSuccess: async()=>{
            console.log('on Success')
        },
        onError:async()=>{
            console.log('on Error')
        }
    })

    const onSubmit = () => {
        const data = {
            title: title.current.input.value,
            body: body.current.input.value
        }

        mutation.mutate(data)
    }

    const columns = [
        {
          title: 'User Id',
          dataIndex: 'userId',
          key: 'userId',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Body',
            dataIndex: 'body',
            key: 'body',
        },
      ];

    return (
        <>
        <PageHeader
            className="site-page-header"
            onBack={() => history.push("/")}
            title="Back to home"
        />
        <Row justify="center" style={{marginBottom:15}}>
            <Title>Try Query Mutation</Title>
        </Row>
        <Row>
            <Col xs={6} lg={8} md={6} style={{marginRight:12}}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="title"
                        name="title"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input defaultValue={titleDefault} name="title" ref={title}/>
                    </Form.Item>

                    <Form.Item
                        label="body"
                        name="body"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input defaultValue={bodyDefault} name="body" ref={body}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={onSubmit}>
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col xs={6} lg={12} md={6}>
                <Table columns={columns} dataSource={ isSuccess ? data : []} pagination={false}/>
            </Col>
        </Row>
        </>
    )
}

export default Index
