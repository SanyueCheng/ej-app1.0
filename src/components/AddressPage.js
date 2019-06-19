import React from 'react';
import { connect } from 'dva';
import { Card, WhiteSpace, List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class AddressPage extends React.Component {

    render() {
        return (
            <div>
                <WhiteSpace size="lg" />
                <Card full>
                    <Card.Header
                        title="This is title"
                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                        extra={<span>this is extra</span>}
                    />
                    <Card.Body>
                        <div>This is content of `Card`</div>
                    </Card.Body>
                    <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                    <List renderHeader={() => 'Subtitle'} className="my-list">
                        <Item arrow="horizontal" multipleLine onClick={() => { }}>
                            Title <Brief>subtitle</Brief>
                        </Item>
                        <Item
                            arrow="horizontal"
                            multipleLine
                            onClick={() => { }}
                            platform="android"
                        >
                            ListItem （Android）<Brief>There may have water ripple effect of <br /> material if you set the click event.</Brief>
                        </Item>
                        
                    </List>
                </Card>
            </div>
        );
    }

}

export default connect(((userModel) => userModel))(AddressPage);